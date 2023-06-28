const DEFAULT_BACK_POPUP_STATE = 'back_popup';
const DEFAULT_ALREADY_PUSHED = 'already_pushed';

let modalOpen = false;

interface BackPopupParams {
  elements: NodeListOf<Element>;
  openModal: () => void;
  backPopupStateName: string;
  pushedStateName: string;
}

interface BackPopupReturn {
  goBack: () => void;
}

export function backpopup({
  elements,
  openModal,
  backPopupStateName = DEFAULT_BACK_POPUP_STATE,
  pushedStateName = DEFAULT_ALREADY_PUSHED,
}: BackPopupParams): BackPopupReturn {
  setupPopstateEventListener(openModal, backPopupStateName);
  setupOnLoad(elements, backPopupStateName, pushedStateName);

  return {
    goBack: () => {
      window.history.go(-2);
    },
  };
}

function setupPopstateEventListener(
  openModal: () => void,
  backPopupStateName: string
) {
  window.addEventListener('popstate', e => {
    console.debug('Popping state:', e.state);

    // popstate gets called for link clicks and forward button so make sure we
    // only open the modal if the state is back_poup state.
    if (modalOpen || e.state !== backPopupStateName) {
      console.debug(
        "Modal is open or state is not 'backup_popup' so not opening modal."
      );
      return;
    }

    modalOpen = true;
    openModal();
  });
}

function setupOnLoad(
  elements: NodeListOf<Element>,
  backPopupStateName: string,
  pushedStateName: string
) {
  window.addEventListener('load', () => {
    if (isReload()) {
      console.debug('Skipping pushState as this was a reload.');
      return;
    }

    elements.forEach(element => {
      element.addEventListener('click', () => {
        if (window.history.state === pushedStateName) {
          console.debug('Already pushed. Not pushing state.');
          return;
        }

        pushState(backPopupStateName);
        pushState(pushedStateName);
      });
    });
  });
}

function isReload() {
  if (!window.performance) {
    return false;
  }

  const entries = window.performance.getEntriesByType(
    'navigation'
  ) as PerformanceNavigationTiming[];
  const hasReload = entries.some(item => item.type === 'reload');
  return hasReload;
}

function pushState(state: any) {
  console.debug('Pushing state:', state);
  window.history.pushState(state, '', '');
}
