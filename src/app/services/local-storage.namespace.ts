import { IAction } from "../interfaces/action";

export namespace LocalStorageNamespace {
  const defaultPrimaryLanguage: string = "German";
  export const localStoragePrimaryLanguageKey: string = "PrimaryLanguage";
  const defaultSecondaryLanguage: string = "English";
  export const localStorageSecondaryLanguageKey: string = "SecondaryLanguage";
  const defaultCountSynchronisedActions: number = 0;
  const localStorageCountSynchronisedActionsKey: string = "CountSynchronisedActions";
  //export const defaultSavedActions = [];
  const localStorageSavedActionsKey: string = "LocalSavedActions"
  const defaultPrimaryId: number = 0;
  const localStoragePrimaryIdKey: string = "PrimaryId";

  const localStorageAuthentificationToken = "AuthentificationToken";
  const localStorageUserKey = "User";

  export function getPrimaryLanguage() {
    let local: string = localStorage.getItem(localStoragePrimaryLanguageKey);
    if (local === null || local === undefined) {
      local = defaultPrimaryLanguage;
    }
    return local;
  }

  export function newPrimaryLanguage(newPrimaryLanguage: string ) {
    localStorage.setItem(localStoragePrimaryLanguageKey, newPrimaryLanguage);
    document.dispatchEvent(new CustomEvent(LocalStorageNamespace.localStoragePrimaryLanguageKey));
  }

  export function getSecondaryLanguage() {
    let local: string = localStorage.getItem(localStorageSecondaryLanguageKey);
    if (local === null || local === undefined) {
      local = defaultSecondaryLanguage;
    }
    return local;
  }

  export function newSecondaryLanguage(newSecondaryLanguage: string ) {
    localStorage.setItem(localStorageSecondaryLanguageKey, newSecondaryLanguage);
    document.dispatchEvent(new CustomEvent(LocalStorageNamespace.localStorageSecondaryLanguageKey));
  }

  export function getCountSynchronisedActions(): number {
    let local: string | number = localStorage.getItem(localStorageCountSynchronisedActionsKey);
    if (local === null || local === undefined) {
      local = defaultCountSynchronisedActions;
    } else {
      local = +local;
    }
    return local as number;
  }

  export function getLocalSavedActions(): IAction[] {
    let local: string | IAction[] = localStorage.getItem(localStorageSavedActionsKey);
    if (local === null || local === undefined) {
      local = []//defaultSavedActions;
    } else {
      local = JSON.parse(local);
    }
    return local as IAction[];
  }

  export function setLocalSavedActions(actions: IAction[]) {
    localStorage.setItem(localStorageSavedActionsKey, JSON.stringify(actions));
  }

  export function deleteLocalSavedActions() {
    localStorage.setItem(localStorageSavedActionsKey, JSON.stringify([]/*defaultSavedActions*/));
    localStorage.removeItem(localStorageSavedActionsKey);
  }

  export function addCountSynchronizedActions(toAdd: number) {
    let newCount = getCountSynchronisedActions() + toAdd;
    localStorage.setItem(localStorageCountSynchronisedActionsKey, newCount+"");
  }

  export function getNextPrimaryId(): number {
    let local = getPrimaryId();
    increasePrimaryId(1);
    return local as number;
  }

  function getPrimaryId(): number {
    let local: string | number = localStorage.getItem(localStoragePrimaryIdKey);
    if (local === null || local === undefined) {
      local = defaultPrimaryId;
    } else {
      local = +local
    }
    return local as number;
  }

  function increasePrimaryId(toAdd: number) {
    let newCount = getPrimaryId() + toAdd;
    localStorage.setItem(localStoragePrimaryIdKey, newCount+"");
  }

  export function setNextPrimaryId(newNumber: number) {
    localStorage.setItem(localStoragePrimaryIdKey, newNumber+"");
  }

  export function isLoggedIn() {
    let loggedIn = localStorage.getItem("LoggedIn");
    if (loggedIn != "true") {
      return false;
    }
    return true;
  }

  export function setLoggedInToTrue() {
    localStorage.setItem("LoggedIn", "true");
  }

  export function getAuthenticationToken() {
    return localStorage.getItem(localStorageAuthentificationToken);
  }

  export function setAuthentificationToken(newToken: string) {
    localStorage.setItem(localStorageAuthentificationToken, newToken);
  }

  export function setUser(newUser:string) {
    localStorage.setItem(localStorageUserKey, newUser);
  }

  export function getUser() {
    return localStorage.getItem(localStorageUserKey);
  }
}
