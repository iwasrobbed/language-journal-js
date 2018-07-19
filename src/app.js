// Setup jQuery $ first
import './helpers/include_jquery.js';

// TODO: Turn these into scoped modules and just call their functions within here

// Break translated text into sentences and words
import { Parser } from './parsing/parser.js';

// Show the context menu in all input fields across the app
import './helpers/context_menu.js';

// Launch all links in an external browser
import './helpers/external_links.js';

// Matches scrolling between two panels of different text
import { ScrollMatching } from './scrolling/scroll_matching';

// Handle translations
import { Translator } from './translation/translator.js'

// Set up initial state
ScrollMatching().setup();

// Testing code

const parser = Parser();
const textarea = $('#editor textarea');
const translatedArea = $('#translated');

const fetchTranslation = async () => {
    const textToTranslate = textarea.val();
    const translator = Translator();
    try {
        const translations = await translator.translate(textToTranslate, 'en', 'fr');
        const paragraphs = parser.createParagraphsForText(translations[0]);
        translatedArea.html(paragraphs);
        parser.createSpansForSentences();
    } catch (err) {
        console.error('Show error UI for: ' + err);
    }
}

textarea.on('keyup paste', fetchTranslation);
