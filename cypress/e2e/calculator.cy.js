describe('calculator tests', () => {
  it('should check that 7 + 9 = 16', () => {
    //1. ARRANGE
    cy.visit('http://127.0.0.1:5501/index.html');


    //2. ACT
    //write code that controls user input

    //cy.get uses a css selector to find an element
    cy.get('[value="7"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="9"]').click();

    cy.get('.screen__history').should("contain", "7+9");

    cy.get('#equals').click();


    //3. ASSERT
    //check if result is what we expect

    //7 + 9 appears on history display (see above due to fun ordering by me)
    //check 16 appears on displays
    cy.get('.screen__history').should("contain", "16");
    cy.get('.screen__current').should("contain", 16);
  })

  it('should check that 8-1=7', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="8"]').click();
    cy.get('[value="-"]').click();
    cy.get('[value="1"]').click();

    cy.get('.screen__history').should("contain", "8-1");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "7");
    cy.get('.screen__current').should("contain", 7);
  })

  it('should check that 4*2=8', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();

    cy.get('.screen__history').should("contain", "4*2");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "8");
    cy.get('.screen__current').should("contain", 8);
  })

  it('should check that 9/3=3', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="9"]').click();
    cy.get('[value="/"]').click();
    cy.get('[value="3"]').click();

    cy.get('.screen__history').should("contain", "9/3");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "3");
    cy.get('.screen__current').should("contain", 3);
  })

  it('should check that 1% = 0.01', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="1"]').click();
    cy.get('[value="%"]').click();

    cy.get('.screen__history').should("contain", "1%");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "0.01");
    cy.get('.screen__current').should("contain", 0.01);
  })

  it('should check that 8% 25 = 2', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="8"]').click();
    cy.get('[value="%"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="5"]').click();

    cy.get('.screen__history').should("contain", "8%25");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "2");
    cy.get('.screen__current').should("contain", 2);
  })

  it('should check that AC clears everything', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('#equals').click();
    cy.get('#AC').click();

    cy.get('.screen__history').should("contain", "");
    cy.get('.screen__current').should("contain", 0);
  })

  it('should check that +- changes the sign accurately', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('#plus-minus').click();
    cy.get('[value="4"]').click();

    cy.get('.screen__history').should("contain", "-4");

    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('#plus-minus').click();

    cy.get('.screen__history').should("contain", "-4*-2");

    cy.get('#plus-minus').click();
    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "-8");
    cy.get('.screen__current').should("contain", -8);
  })

  it('should check that decimals work', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="."]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();

    cy.get('.screen__history').should("contain", "4.2*2");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "8.4");
    cy.get('.screen__current').should("contain", 8.4);
  })

  it('should chain operators simply (not bidmas)', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();

    cy.get('.screen__history').should("contain", "4+2*2");

    cy.get('#equals').click();

    cy.get('.screen__history').should("contain", "12");
    cy.get('.screen__current').should("contain", 12);
  })


  it('should not be able to have multiple decimals in one number', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="."]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="."]').click();
    cy.get('[value="2"]').click();

    cy.get('.screen__history').should("not.contain", "4.2.2");
  })

  it('should not be able to have adjacent operators', () => {
    cy.visit('http://127.0.0.1:5501/index.html');

    cy.get('[value="4"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="2"]').click();

    cy.get('.screen__history').should("not.contain", "4*+2");

  })
})