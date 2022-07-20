import {baseUrl} from '../../src/utils/fetchData';

describe('burger constructor is working', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  describe('ingredient modal is working', () => {
    it('opens and closes ingredient modal', function() {
      cy.get('[class^=Menu_card__]').first().as('ingredient');
      cy.get('#modals').as('modalContainer');

      cy.get('@ingredient').click();
      cy.get('@modalContainer')
        .find('[class^=IngredientDetails_module__container__]')
        .should('exist');
      cy.get('@modalContainer').find('[class^=Modal_modal__closeButton__]').click();
      cy.get('@modalContainer')
        .find('[class^=IngredientDetails_module__container__]')
        .should('not.exist');
    });
  });

  describe('auth is working', () => {
    it('sign in is working', function() {
      cy.get('[class^=AppHeader_li__]').contains('Личный кабинет').click();
      cy.get('[class^=pages_login__form__]').then((loginForm) => {
        if (loginForm) {
          cy.get('input[type="email"]').type('1@yandex.ru');
          cy.get('input[type="password"]').type('1');
          cy.get('button').contains('Войти').click();
        }
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
    });
    });

    it('you shouldn`t be able to send order without ingredients', function() {
      cy.get('[class^=AppHeader_li__]').contains('Конструктор').click();

      cy.get('[class^=BurgerConstructor_price__]')
        .find('button')
        .click();

      cy.get('[class^=BurgerConstructor_popup__]')
        .should('exist');

      cy.wait(6000)

      cy.get('[class^=BurgerConstructor_popup__]')
        .should('not.exist');
    });
  });

  describe('it`s possible to add bun to burger constructor', () => {
    it('adding bun to constructor', function() {
      cy.get('[class^=Menu_card__]').first().as('menuIngredient');
      cy.get('[class^=BurgerConstructor_constructor__isLoading__]').as('constructor');


      cy.get('@menuIngredient').trigger('dragstart');
      cy.get('@constructor').trigger('drop');
    });

    it('you shouldn`t be able to send order only with bun', function() {
      cy.get('[class^=AppHeader_li__]').contains('Конструктор').click();

      cy.get('[class^=BurgerConstructor_price__]')
        .find('button')
        .click();

      cy.get('[class^=BurgerConstructor_popup__]')
        .should('exist');

      cy.wait(6000)

      cy.get('[class^=BurgerConstructor_popup__]')
        .should('not.exist');
    });
  });

  describe('it`s possible to add ingredient to burger constructor', () => {
    it('adding ingredient to constructor', function() {

      cy.get('[class^=Menu_card__]').as('menu');
      cy.get('[class^=IngredientsConstructor_constructor__]').as('constructor');

      cy.get('[class^=BurgerIngredients_menu__ingredients__]')
        .children()
        .contains('Мясо бессмертных моллюсков Protostomia')
        .trigger('dragstart')
      cy.get('@constructor')
        .first()
        .trigger('drop');

      cy.get('[class^=BurgerIngredients_menu__ingredients__]')
        .children()
        .contains('Биокотлета из марсианской Магнолии')
        .trigger('dragstart')
      cy.get('@constructor')
        .first()
        .trigger('drop');
    });
  });

  describe('check if you can order', () => {
    it('order button should work', function() {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          'email': '1@yandex.ru',
          'password': '1'
        }
      })
      .then((data) => {
        const accessToken = data.body.accessToken.split('Bearer ')[1];
        const refreshToken = data.body.refreshToken;

        cy.setCookie('token', accessToken);
        cy.setCookie('refreshToken', refreshToken);
      });

      cy.get('[class^=BurgerConstructor_price__]')
          .contains('Оформить заказ')
          .as('orderButton');

      cy.get('@orderButton').click();

      cy.wait(16000);

      cy.get('[class^=OrderDetails_module__container__]')
        .contains('идентификатор заказа');
    });

    it('orderId modal is closing correctly', function() {
      cy.get('body').type('{esc}');
    });
  });

  describe('log out is working', () => {
    it('successfully log out', function() {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          'email': '1@yandex.ru',
          'password': '1'
        }
      })
      .then((data) => {
        const accessToken = data.body.accessToken.split('Bearer ')[1];
        const refreshToken = data.body.refreshToken;

        cy.setCookie('token', accessToken);
        cy.setCookie('refreshToken', refreshToken);
      });

      cy.get('[class^=AppHeader_li__]').contains('Личный кабинет').click();
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
      cy.get('[class^=ProfileLayout_profile__tab__]').contains('Выход').click()

      cy.url().should('contain', '/login');
    });
  });
});