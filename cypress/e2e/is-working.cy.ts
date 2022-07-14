describe('burger constructor is working', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('accessToken', 'refreshToken');
  });

  after(() => {
    cy.clearCookies();
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
  });

  describe('it`s possible to add bun to burger constructor', () => {
    it('adding bun to constructor', function() {
      cy.get('[class^=AppHeader_li__]').contains('Конструктор').click();

      cy.get('[class^=Menu_card__]').first().as('menuIngredient');
      cy.get('[class^=BurgerConstructor_constructor__isLoading__]').as('constructor');


      cy.get('@menuIngredient').trigger('dragstart');
      cy.get('@constructor').trigger('drop');
    });
  });

  it('you can`t be able to send order only with bun', function() {
    cy.get('[class^=BurgerConstructor_price__]').find('button').contains('Оформить заказ').click();
    // Доделать !!!
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
      cy.get('[class^=BurgerConstructor_price__]')
          .contains('Оформить заказ')
          .as('orderButton');

      cy.get('@orderButton', {timeout: 20000}).click();
    });

    it('order id appeared', () => {
      cy.get('[class^=OrderDetails_module__id__]', {
        timeout: 20000,
      }).contains('идентификатор заказа');
    });
  });

  describe('log out is working', () => {
    it('successfully log out', function() {
      cy.get('[class^=AppHeader_li__]').contains('Личный кабинет').click();
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
      cy.get('[class^=ProfileLeyout_profile__tab__]').contains('Выход').click()
    })
  });
});