describe("template spec", () => {
  it("passes", () => {
    cy.request("https://serverest.dev/usuarios").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
