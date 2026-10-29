import { UserAccount } from '../types';

export const DAILY_NUTRIA_FREE_LIMIT = 10;
export const NUTRIA_WARNING_THRESHOLD = 8;

export interface NutriaQuotaStatus {
  count: number;
  limit: number;
  remaining: number;
  date: string;
  isLimitReached: boolean;
  isWarningZone: boolean;
  isUnlimited: boolean;
}

/**
 * Retorna a data local de hoje no formato AAAA-MM-DD
 */
export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Verifica se o usuário possui plano pago ativo com mensagens ilimitadas
 */
export function isUserPlanUnlimited(userAccount?: UserAccount | null): boolean {
  if (!userAccount) return false;
  const plan = userAccount.plan;
  return plan === 'premium_mensal' || plan === 'premium_anual' || Boolean(userAccount.isSubscribed);
}

/**
 * Recupera a contagem persistida de mensagens do dia para a NÚTRIA IA.
 * REGRA CRÍTICA: Se o usuário sair do NutrinK, fechar o navegador ou deslogar e voltar
 * NO MESMO DIA, a contagem NÃO É ZERADA sob hipótese alguma.
 * Ela só é zerada quando a data do calendário mudar (novo dia).
 */
export function getDailyNutriaUsage(userAccount?: UserAccount | null): NutriaQuotaStatus {
  const isUnlimited = isUserPlanUnlimited(userAccount);
  const today = getTodayDateKey();
  const cleanEmail = userAccount?.email?.trim().toLowerCase();

  let maxFoundCount = 0;

  try {
    // 1. Busca contagem armazenada diretamente com a chave da data de hoje
    const quotaTodayRaw = localStorage.getItem(`nutria_quota_${today}`);
    if (quotaTodayRaw) {
      const parsed = parseInt(quotaTodayRaw, 10);
      if (!isNaN(parsed) && parsed > maxFoundCount) maxFoundCount = parsed;
    }

    // 2. Busca contagem com a chave vinculada ao e-mail do usuário e data de hoje
    if (cleanEmail) {
      const userQuotaTodayRaw = localStorage.getItem(`nutria_quota_${cleanEmail}_${today}`);
      if (userQuotaTodayRaw) {
        const parsed = parseInt(userQuotaTodayRaw, 10);
        if (!isNaN(parsed) && parsed > maxFoundCount) maxFoundCount = parsed;
      }
    }

    // 3. Verifica formato legado nutria_msg_date / nutria_msg_count caso coincida com hoje
    const globalDate = localStorage.getItem('nutria_msg_date');
    if (globalDate === today) {
      const globalCountRaw = localStorage.getItem('nutria_msg_count');
      if (globalCountRaw) {
        const parsed = parseInt(globalCountRaw, 10);
        if (!isNaN(parsed) && parsed > maxFoundCount) maxFoundCount = parsed;
      }
    }

    // 4. Verifica formato por e-mail nutria_msg_date_${cleanEmail}
    if (cleanEmail) {
      const emailDate = localStorage.getItem(`nutria_msg_date_${cleanEmail}`);
      if (emailDate === today) {
        const emailCountRaw = localStorage.getItem(`nutria_msg_count_${cleanEmail}`);
        if (emailCountRaw) {
          const parsed = parseInt(emailCountRaw, 10);
          if (!isNaN(parsed) && parsed > maxFoundCount) maxFoundCount = parsed;
        }
      }
    }

    // 5. Verifica contagem registrada no objeto userAccount se data coincidir com hoje
    if (userAccount?.lastDailyMessageDate === today && typeof userAccount.dailyMessageCount === 'number') {
      if (userAccount.dailyMessageCount > maxFoundCount) {
        maxFoundCount = userAccount.dailyMessageCount;
      }
    }

    // 6. Verifica sessão salva em nutrink_user_session
    const rawSession = localStorage.getItem('nutrink_user_session');
    if (rawSession) {
      try {
        const parsedSession = JSON.parse(rawSession);
        if (parsedSession?.lastDailyMessageDate === today && typeof parsedSession.dailyMessageCount === 'number') {
          if (parsedSession.dailyMessageCount > maxFoundCount) {
            maxFoundCount = parsedSession.dailyMessageCount;
          }
        }
      } catch {}
    }

    // Sincroniza todas as chaves com o valor mais alto apurado para hoje
    localStorage.setItem('nutria_msg_date', today);
    localStorage.setItem('nutria_msg_count', String(maxFoundCount));
    localStorage.setItem(`nutria_quota_${today}`, String(maxFoundCount));
    if (cleanEmail) {
      localStorage.setItem(`nutria_msg_date_${cleanEmail}`, today);
      localStorage.setItem(`nutria_msg_count_${cleanEmail}`, String(maxFoundCount));
      localStorage.setItem(`nutria_quota_${cleanEmail}_${today}`, String(maxFoundCount));
    }
  } catch (err) {
    console.warn('Aviso ao consultar cota diária:', err);
  }

  const limit = DAILY_NUTRIA_FREE_LIMIT;
  const remaining = Math.max(0, limit - maxFoundCount);
  const isLimitReached = !isUnlimited && maxFoundCount >= limit;
  const isWarningZone = !isUnlimited && maxFoundCount >= NUTRIA_WARNING_THRESHOLD && maxFoundCount < limit;

  return {
    count: maxFoundCount,
    limit,
    remaining,
    date: today,
    isLimitReached,
    isWarningZone,
    isUnlimited
  };
}

/**
 * Incrementa o contador de mensagens diárias enviadas e persiste com segurança.
 * Mantém a contagem íntegra durante todo o dia corrente mesmo após recarregar ou sair da aplicação.
 */
export function incrementDailyNutriaUsage(userAccount?: UserAccount | null): NutriaQuotaStatus {
  const today = getTodayDateKey();
  const cleanEmail = userAccount?.email?.trim().toLowerCase();

  const currentStatus = getDailyNutriaUsage(userAccount);
  const nextCount = currentStatus.count + 1;

  try {
    localStorage.setItem('nutria_msg_date', today);
    localStorage.setItem('nutria_msg_count', String(nextCount));
    localStorage.setItem(`nutria_quota_${today}`, String(nextCount));
    localStorage.setItem('nutrink_guest_msg_count', String(nextCount));

    if (cleanEmail) {
      localStorage.setItem(`nutria_msg_date_${cleanEmail}`, today);
      localStorage.setItem(`nutria_msg_count_${cleanEmail}`, String(nextCount));
      localStorage.setItem(`nutria_quota_${cleanEmail}_${today}`, String(nextCount));
    }

    // Sincroniza sessão do usuário mantendo a contagem do dia
    const rawSession = localStorage.getItem('nutrink_user_session');
    if (rawSession) {
      try {
        const parsed = JSON.parse(rawSession);
        const updated = {
          ...parsed,
          dailyMessageCount: nextCount,
          lastDailyMessageDate: today
        };
        localStorage.setItem('nutrink_user_session', JSON.stringify(updated));
      } catch {}
    }
  } catch (e) {
    console.warn('Erro ao persistir incremento da cota de mensagens diárias:', e);
  }

  const isUnlimited = currentStatus.isUnlimited;
  const limit = DAILY_NUTRIA_FREE_LIMIT;
  const remaining = Math.max(0, limit - nextCount);
  const isLimitReached = !isUnlimited && nextCount >= limit;
  const isWarningZone = !isUnlimited && nextCount >= NUTRIA_WARNING_THRESHOLD && nextCount < limit;

  return {
    count: nextCount,
    limit,
    remaining,
    date: today,
    isLimitReached,
    isWarningZone,
    isUnlimited
  };
}
