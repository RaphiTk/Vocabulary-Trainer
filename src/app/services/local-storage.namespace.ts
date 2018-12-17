export namespace LocalStorageNamespace {
  const defaultPrimaryLanguage: string = "German";
  export const localStoragePrimaryLanguageKey: string = "PrimaryLanguage";
  const defaultSecondaryLanguage: string = "English";
  export const localStorageSecondaryLanguageKey: string = "SecondaryLanguage";

  export function getPrimaryLanguage() {
    let local: string = localStorage.getItem(this.localStoragePrimaryLanguageKey);
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
    let local: string = localStorage.getItem(this.localStorageSecondaryLanguageKey);
    if (local === null || local === undefined) {
      local = defaultSecondaryLanguage;
    }
    return local;
  }

  export function newSecondaryLanguage(newSecondaryLanguage: string ) {
    localStorage.setItem(localStorageSecondaryLanguageKey, newSecondaryLanguage);
    document.dispatchEvent(new CustomEvent(LocalStorageNamespace.localStorageSecondaryLanguageKey));
  }
}
