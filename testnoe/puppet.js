const puppeteer = require('puppeteer');

async function scrapeBasketballStats() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Naviga verso la pagina con le statistiche di basket
  await page.goto('https://www.espn.com/nba/boxscore/_/gameId/401585662');

  // Esempio di estrazione delle statistiche dei giocatori
  const playerStats = await page.evaluate(() => {
    const stats = [];
    // Modifica questa parte del codice in base alla struttura della pagina web
    const playerElements = document.querySelectorAll('SELETTORE_DEGLI_ELEMENTI_DEI_GIOCATORI');
    playerElements.forEach(playerElement => {
      const playerName = playerElement.querySelector('SELETTORE_DELL_ELEMENTO_CON_IL_NOME_DEL_GIOCATORE').innerText;
      const playerPoints = playerElement.querySelector('SELETTORE_DELL_ELEMENTO_CON_I_PUNTI_DEL_GIOCATORE').innerText;
      // Aggiungi altre statistiche se necessario
      stats.push({ playerName, playerPoints });
    });
    return stats;
  });

  console.log(playerStats);

  await browser.close();
}

scrapeBasketballStats();