describe('Formulaire de contact', () => {
    beforeEach(() => {
      // Remplace par l'URL où ton projet est hébergé
      cy.visit('http://127.0.0.1:5500');
    });
  
    it('Devrait afficher le titre et le formulaire de contact', () => {
      cy.get('h1').should('have.text', 'Contactez-nous'); // Vérifie le titre
      cy.get('form').should('exist'); // Vérifie l'existence du formulaire
    });
  
    it('Devrait remplir et soumettre le formulaire avec succès', () => {
      cy.get('#name').type('Jean Dupont');
      cy.get('#email').type('jean.dupont@example.com');
      cy.get('#message').type('Bonjour, ceci est un test.');
      
      cy.get('form').submit(); // Soumet le formulaire
  
      cy.get('#success-message').should('be.visible').and('have.text', 'Formulaire soumis avec succès !'); // Vérifie le message de succès
    });
  
    it('Devrait afficher une alerte si les champs ne sont pas remplis', () => {
      cy.get('form').submit(); // Soumet le formulaire sans remplir les champs
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Veuillez remplir tous les champs.'); // Vérifie que l'alerte s'affiche
      });
    });
  
    it('Devrait valider le champ email', () => {
      cy.get('#name').type('Jean Dupont');
      cy.get('#email').type('jean.dupont@example'); // Adresse email invalide
      cy.get('#message').type('Bonjour, ceci est un test.');
      
      cy.get('form').submit(); // Soumet le formulaire
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Veuillez remplir tous les champs.'); // Le formulaire ne se soumet pas
      });
    });
  
    it('Devrait ne pas soumettre si un champ est vide', () => {
      cy.get('#name').type('Jean Dupont');
      cy.get('#email').type('jean.dupont@example.com');
      // Le champ message est vide
  
      cy.get('form').submit(); // Soumet le formulaire
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Veuillez remplir tous les champs.'); // Vérifie que l'alerte s'affiche
      });
    });
    it('Devrait vérifier le style de base de la page', () => {
        cy.get('body').should('have.css', 'background-color', 'rgb(244, 244, 244)'); // Vérifie la couleur de fond
        cy.get('.container').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // Vérifie la couleur de fond du conteneur
        cy.get('.container').should('have.css', 'padding', '20px'); // Vérifie le padding du conteneur
        cy.get('.container').should('have.css', 'border-radius', '8px'); // Vérifie les bordures arrondies du conteneur
      });
    
      // Vérification des styles du texte
      it('Devrait vérifier le style des titres et des textes', () => {
        cy.get('h1').should('have.css', 'text-align', 'center'); // Vérifie l'alignement du titre
        cy.get('h1').should('have.css', 'margin-bottom', '20px'); // Vérifie la marge en bas du titre
        cy.get('h1').should('have.css', 'font-family').and('match', /Arial/); // Vérifie la police utilisée pour le titre
      });
    
      // Vérification des styles du formulaire
      it('Devrait vérifier le style des champs de formulaire', () => {
        cy.get('input[type="text"]').should('have.css', 'padding', '10px'); // Vérifie le padding des champs
        cy.get('input[type="email"]').should('have.css', 'border-radius', '4px'); // Vérifie les bordures arrondies des champs
        cy.get('textarea').should('have.css', 'resize', 'vertical'); // Vérifie que la zone de texte peut être redimensionnée verticalement
      });
    
      // Vérification du bouton
      it('Devrait vérifier le style du bouton', () => {
        cy.get('button').should('have.css', 'background-color', 'rgb(40, 167, 69)'); // Vérifie la couleur de fond du bouton
        cy.get('button').should('have.css', 'color', 'rgb(255, 255, 255)'); // Vérifie la couleur du texte
        cy.get('button').should('have.css', 'cursor', 'pointer'); // Vérifie que le curseur est une main sur le bouton
      });
    
      // Vérification du message de succès
      it('Devrait vérifier le style du message de succès caché', () => {
        cy.get('#success-message').should('have.css', 'display', 'none'); // Vérifie que le message de succès est caché par défaut
    
        // Après soumission du formulaire, le message de succès devrait s'afficher
        cy.get('#name').type('Jean Dupont');
        cy.get('#email').type('jean.dupont@example.com');
        cy.get('#message').type('Ceci est un message test.');
        cy.get('form').submit();
        cy.get('#success-message').should('have.css', 'display', 'block'); // Vérifie que le message est visible après soumission
      });
  });
  