//
// Parses the translated text and turns it into a series of
// sentences and words.
//
// There is a lot of room for optimization here, such as
// creating a map of which sentences haven't changed so we don't
// parse them again
//

export const Parser = () => {

    // Private API

    const createSpansForSentences = () => {
        const translatedParagraphs = $('#translated p')
        translatedParagraphs.each(function() {
            var sentences = $(this)
                .text()
                .replace(/(((?![.!?;:]['"]?\s).)*[.!?;:]['"]?)(\s|$)/g,
                         '<span class="sentence">$1</span>$3');
            $(this).html(sentences);

            $(this).children('span.sentence').each(function() {
                var words = $(this).text().trim().split(' ');
                var spannedSentence = '';
                var spannedWords = $(words).each(function(i, word) {
                    spannedSentence += '<span class="word">' + word + '</span> '
                });
                $(this).html(spannedSentence);
            });
        });
    }

    const createParagraphsForText = (text) => {
        if (!text) {
            console.log("No text to parse, so returning");
            return;
        }
        if (typeof text !== 'string') {
            throw 'Bad input value for text parameter: ' + typeof text
        }

        var output = '';
        $(text.split("\n\n")).each(function(i, paragraph) {
            output += '<p>' + paragraph + '</p>';
        });
        return output;
    }

    // Public API

    return {
        createSpansForSentences: createSpansForSentences,
        createParagraphsForText: createParagraphsForText
    }
}
