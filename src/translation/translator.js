//
// Handles translating text via a web service, such as Google Translate
// and then returns the translation(s) for the UI to render
//

export const Translator = () => {

    // TODO: Create rate limiter to debounce this a bit for $$ safety

    // Private API

    const translate = async (text, from, to) => {
      // Imports the Google Cloud client library
      const GoogleTranslate = require('@google-cloud/translate');

      // Instantiates a client
      const translator = GoogleTranslate({
          projectId: 'addYourOwn',
          keyFilename: './src/translation/gtranslate_secret.json'
      });

      // Language options
      var options = {
        from: from,
        to: to
      };

      // Do yo thang chicken wang
      return translator.translate(text, options);
    };

    // Public API

    return {
        translate: translate
    }
}
