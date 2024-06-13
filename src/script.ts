import './styles.scss';

class Dialog {
    private content: Element | null = null;

    constructor(private dialog: Element) {
        this.content = dialog.querySelector('.dialog__content');

        this.setEventListeners();
    }

    open() {
        this.dialog.classList.remove('dialog--hidden');
    }

    close() {
        this.dialog.classList.add('animate-out');

        this.dialog.addEventListener(
            'animationend',
            () => {
                this.dialog.classList.add('dialog--hidden');
                this.dialog.classList.remove('animate-out');
            },
            { once: true }
        );
    }

    setContent(content: string) {
        if (this.content) {
            this.content.innerHTML = content;
        }
    }

    private setEventListeners() {
        const dialogBackdrop = this.dialog.querySelector('.dialog__backdrop');
        const closeDialogBtn = this.dialog.querySelector('.dialog__close-btn');

        closeDialogBtn?.addEventListener('click', () => this.close());
        dialogBackdrop?.addEventListener('click', () => this.close());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const bannerBtn = document.querySelector<HTMLButtonElement>('.banner__button');
    const authDialogElem = document.querySelector('.auth-dialog')!;

    const authDialog = new Dialog(authDialogElem);

    bannerBtn?.addEventListener('click', () => authDialog.open());

    authDialog.setContent(`
        <form class="auth-form">
            <h2 class="auth-form__title">Войти в систему</h2>
            <div class="auth-form__group">
                <input type="text" name="login" class="auth-form__input" placeholder="Email/Телефон" required minlength="5" />
                <input type="password" name="password" class="auth-form__input" placeholder="Пароль" required minlength="5" />
            </div>
            <label class="auth-form__checkbox-wrapper">
                <div class="checkbox">
                    <input type="checkbox" />
                    <svg class="checkbox__check-mark" viewBox="0 0 24 24">
                        <path
                            d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        ></path>
                    </svg>
                </div>
                <span>Запомнить пароль</span>
            </label>
            <button type="button" class="button button--text auth-form__restore-btn">Восстановить</button>
            <div class="auth-form__group auth-form__main-btns">
                <button type="submit" class="button auth-form__login-btn">Войти</button>
                <button type="button" class="button button--outlined auth-form__register-btn">Регистрация</button>
            </div>
        </form>
    `);

    const authForm = authDialogElem.querySelector<HTMLFormElement>('.auth-form');

    authForm?.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});
