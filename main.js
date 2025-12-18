Hooks.on("init", () => {
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "dragonbane-translation-ita",
      lang: "it",
      dir: "compendium"
    });
  }
});

Hooks.once("ready", async () => {
  const MODULE_ID = "dragonbane-translation-ita";
  const VERSION_KEY = "shownVersion";

  // Registra un'impostazione nascosta che memorizza l'ultima versione per cui è stato mostrato il messaggio
  game.settings.register(MODULE_ID, VERSION_KEY, {
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  const module = game.modules.get(MODULE_ID);
  const currentVersion = module?.version ?? "unknown";
  const lastShownVersion = game.settings.get(MODULE_ID, VERSION_KEY);

  // Se la versione è nuova (mai mostrata), crea il messaggio
  if (currentVersion !== lastShownVersion) {
    ChatMessage.create({
      user: game.user.id,
      speaker: { alias: "Traduzione Italiana Dragonbane" },
      content: `<h4>Benvenuto nella traduzione italiana di Dragonbane</h4>
                <p><em>Versione attuale ${currentVersion}</em></p><p></p>
                <p> Con questa versione del modulo avrai: </p>
                <ul>
                <li> Traduzione delle <a href="https://foundryvtt.com/packages/dragonbane-coreset" target="_blank">Dragonbane Core Rules</a> ufficiali tramite Babele ed importazione del compendio </li>
                <li> Traduzione del modulo <a href="https://foundryvtt.com/packages/dragonbane-action-rules" target="_blank"> Dragonbane Combat Assistant </a> </li>
                <li> Traduzione del modulo <a href="https://foundryvtt.com/packages/dragonbane-item-browser" target="_blank"> Dragonbane - Item Browser </a></li>
                <li> Traduzione del modulo <a href="https://foundryvtt.com/packages/dragonbane-status-effects" target="_blank"> Dragonbane Status Effects </a></li>
                <li> Traduzione del modulo <a href="https://foundryvtt.com/packages/token-action-hud-dragonbane" target="_blank"> Token Action HUD for Dragonbane </a></li>
                </ul>
                <p>Per maggiori dettagli visita il nostro <a href="https://github.com/LuckyFrico/dragonbane-translation-ita" target="_blank"> GitHub </a>.</p><p></p>
                <p><em>Attualmente in lavorazione la traduzione del <a href="https://foundryvtt.com/packages/dragonbane-bestiary" target="_blank">Bestiario</a>!</em></p><p></p>
                <p>Percentuale di completamento traduzioni:</p>
                <ul>
                <li> Dragonbane Core Rules: 72% </li>
                <li> Dragonbane Bestiary: 0% </li>
                </ul>`
    });

    await game.settings.set(MODULE_ID, VERSION_KEY, currentVersion);
  }
});