export interface LikedState {
  isLiked: boolean;
  timestamp: number;
}

export interface ViewedState {
  hasViewed: boolean;
  lastViewedDateKey: string;
  timestamp: number;
}

export const LIKED_CUSTOMERS_STATE_KEY = 'liked_customers_state:v2';
export const VIEWED_CUSTOMERS_STATE_KEY = 'viewed_customers_state:v2';

const LEGACY_LIKED_CUSTOMERS_STATE_KEY = 'liked_customers_state';
const LEGACY_VIEWED_CUSTOMERS_STATE_KEY = 'viewed_customers_state';
const INTERACTION_TIME_ZONE = 'Asia/Shanghai';

function readJsonRecord<T>(key: string): Record<string, T> {
  if (typeof window === 'undefined') return {};

  try {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function writeJsonRecord<T>(key: string, states: Record<string, T>) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(states));
}

function getDateKey(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: INTERACTION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return formatter.format(date);
}

function getDateKeyFromTimestamp(timestamp: unknown) {
  return typeof timestamp === 'number' && Number.isFinite(timestamp)
    ? getDateKey(new Date(timestamp))
    : getDateKey();
}

const getLikedCustomersState = (): Record<string, LikedState> => {
  if (typeof window === 'undefined') return {};

  try {
    const currentStates = readJsonRecord<LikedState>(LIKED_CUSTOMERS_STATE_KEY);
    if (Object.keys(currentStates).length > 0) {
      return currentStates;
    }

    const legacyStates = readJsonRecord<{
      isLiked?: unknown;
      timestamp?: unknown;
    }>(LEGACY_LIKED_CUSTOMERS_STATE_KEY);
    const migratedStates = Object.fromEntries(
      Object.entries(legacyStates)
        .filter(([, state]) => typeof state?.isLiked === 'boolean')
        .map(([id, state]) => [
          id,
          {
            isLiked: Boolean(state.isLiked),
            timestamp:
              typeof state.timestamp === 'number' && Number.isFinite(state.timestamp)
                ? state.timestamp
                : Date.now()
          }
        ])
    );

    if (Object.keys(migratedStates).length > 0) {
      writeJsonRecord(LIKED_CUSTOMERS_STATE_KEY, migratedStates);
    }

    return migratedStates;
  } catch {
    return {};
  }
};

export const saveLikedCustomerState = (id: string | number, isLiked: boolean) => {
  if (typeof window === 'undefined') return;
  try {
    const states = getLikedCustomersState();
    states[String(id)] = {
      isLiked,
      timestamp: Date.now()
    };
    writeJsonRecord(LIKED_CUSTOMERS_STATE_KEY, states);
  } catch (e) {
    console.error('Failed to save liked customer state', e);
  }
};

export const getLikedCustomerState = (id: string | number) => {
  const states = getLikedCustomersState();
  return states[String(id)];
};

const getViewedCustomersState = (): Record<string, ViewedState> => {
  if (typeof window === 'undefined') return {};

  try {
    const currentStates = readJsonRecord<ViewedState>(VIEWED_CUSTOMERS_STATE_KEY);
    if (Object.keys(currentStates).length > 0) {
      return currentStates;
    }

    const legacyStates = readJsonRecord<{
      hasViewed?: unknown;
      timestamp?: unknown;
    }>(LEGACY_VIEWED_CUSTOMERS_STATE_KEY);
    const migratedStates = Object.fromEntries(
      Object.entries(legacyStates)
        .filter(([, state]) => state?.hasViewed === true)
        .map(([id, state]) => {
          const timestamp =
            typeof state.timestamp === 'number' && Number.isFinite(state.timestamp)
              ? state.timestamp
              : Date.now();

          return [
            id,
            {
              hasViewed: true,
              lastViewedDateKey: getDateKeyFromTimestamp(timestamp),
              timestamp
            }
          ];
        })
    );

    if (Object.keys(migratedStates).length > 0) {
      writeJsonRecord(VIEWED_CUSTOMERS_STATE_KEY, migratedStates);
    }

    return migratedStates;
  } catch {
    return {};
  }
};

export const saveViewedCustomerState = (id: string | number, hasViewed: boolean) => {
  if (typeof window === 'undefined') return;
  try {
    const states = getViewedCustomersState();
    const lastViewedDateKey = getDateKey();

    states[String(id)] = {
      hasViewed,
      lastViewedDateKey,
      timestamp: Date.now()
    };
    writeJsonRecord(VIEWED_CUSTOMERS_STATE_KEY, states);
  } catch (e) {
    console.error('Failed to save viewed customer state', e);
  }
};

export const getViewedCustomerState = (id: string | number) => {
  const states = getViewedCustomersState();
  const state = states[String(id)];

  if (!state) {
    return undefined;
  }

  return {
    ...state,
    hasViewed: state.hasViewed
  };
};
