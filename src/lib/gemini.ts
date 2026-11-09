/**
 * NUTRIA - Integração Gemini (Server-Side Architecture)
 * 
 * As chamadas à API do Google Gemini (incluindo geração de texto, streaming e Live API)
 * são processadas com segurança no backend Node.js (server.ts) através do SDK @google/genai.
 * O navegador conecta-se exclusivamente via rotas de API do servidor (/api/gemini/* e /api/nutria/*)
 * ou WebSockets para áudio em tempo real (/api/gemini/live).
 */

import { 
  getClientGeminiModel, 
  NUTRIA_SYSTEM_INSTRUCTION, 
  buildNutriaSystemInstruction,
  formatGeminiContents,
  callNutriaDirect,
  NutriaCallParams,
  NutriaResponse 
} from '../services/nutriaGeminiDirect';

export {
  getClientGeminiModel,
  NUTRIA_SYSTEM_INSTRUCTION,
  buildNutriaSystemInstruction,
  formatGeminiContents,
  callNutriaDirect
};

/**
 * Função utilitária de alto nível para envio de comandos e perguntas clínicas à NÚTRIA
 */
export async function askNutria(
  message: string, 
  options: Partial<NutriaCallParams> = {}
): Promise<NutriaResponse> {
  return callNutriaDirect({
    message,
    ...options
  });
}

export interface ServerGenerateParams {
  prompt?: string;
  contents?: any;
  model?: string;
  systemInstruction?: string;
  config?: any;
}

/**
 * Executa geração de conteúdo de texto via proxy seguro do servidor (/api/gemini/generate)
 */
export async function generateContentOnServer(params: ServerGenerateParams): Promise<{ text: string; model: string }> {
  const response = await fetch('/api/gemini/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Falha na requisição ao servidor' }));
    throw new Error(errorData.error || `Erro HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Executa geração em streaming (Server-Sent Events) via rota /api/gemini/stream
 */
export async function streamContentFromServer(
  params: ServerGenerateParams,
  callbacks: {
    onChunk: (chunkText: string) => void;
    onComplete?: () => void;
    onError?: (err: any) => void;
  }
): Promise<void> {
  try {
    const response = await fetch('/api/gemini/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!response.ok || !response.body) {
      throw new Error(`Falha ao iniciar streaming: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              callbacks.onChunk(data.text);
            }
            if (data.done && callbacks.onComplete) {
              callbacks.onComplete();
            }
          } catch {}
        }
      }
    }
  } catch (err: any) {
    if (callbacks.onError) {
      callbacks.onError(err);
    } else {
      console.error('[Gemini Stream Error]:', err);
    }
  }
}

export interface LiveAudioSessionOptions {
  onAudioChunk?: (base64Audio: string) => void;
  onTranscript?: (transcript: string) => void;
  onInterrupted?: () => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

/**
 * Cria uma sessão interativa de áudio em tempo real via WebSocket conectado ao Gemini Live do servidor
 */
export function createLiveAudioSession(options: LiveAudioSessionOptions = {}) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/api/gemini/live`;
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('[Gemini Live Client] Conectado ao servidor de voz Live');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.audio && options.onAudioChunk) {
        options.onAudioChunk(data.audio);
      }
      if (data.outputTranscript && options.onTranscript) {
        options.onTranscript(data.outputTranscript);
      }
      if (data.text && options.onTranscript) {
        options.onTranscript(data.text);
      }
      if (data.interrupted && options.onInterrupted) {
        options.onInterrupted();
      }
      if (data.error && options.onError) {
        options.onError(new Error(data.error));
      }
    } catch (e) {
      console.error('[Gemini Live Parse Error]:', e);
    }
  };

  ws.onerror = (err) => {
    options.onError?.(err);
  };

  ws.onclose = () => {
    options.onClose?.();
  };

  return {
    sendAudioChunk: (base64Pcm16k: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ audio: base64Pcm16k }));
      }
    },
    sendTextMessage: (text: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ text }));
      }
    },
    sendVideoFrame: (base64Jpeg: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ video: base64Jpeg }));
      }
    },
    close: () => {
      ws.close();
    }
  };
}
