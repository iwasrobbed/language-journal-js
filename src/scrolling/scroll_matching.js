//
// Sets up a very poor man's approach to matching scrolling
// offsets between the editor (original text) and the translated text
//

export const ScrollMatching = () => {

    // Private API

    const setup = () => {

        const editor = $('#editor'),
              editorTextarea = $('#editor textarea'),
              translatedWrapper = $('#translated-wrapper');

        // Set up scroll matching (very poor man's approach for now)
        const editorHeight = editorTextarea.prop('scrollHeight');
        const translatedHeight = translatedWrapper.prop('scrollHeight');
        const relativeHeightRatio = editorHeight / translatedHeight;

        editorTextarea.scroll(function(){
            // Todo: check if hovering over scrollbar as well
            if (editor.is(':hover')) {
                const length = $(this).scrollTop();
                if (editorHeight >= translatedHeight) {
                    translatedWrapper.scrollTop(length * relativeHeightRatio);
                } else {
                    translatedWrapper.scrollTop(length / relativeHeightRatio);
                }
            }
        });

        translatedWrapper.on('scroll', function(e) {
            // Todo: check if hovering over scrollbar as well
            if ($(this).is(':hover')) {
                const length = $(this).scrollTop();
                if (editorHeight >= translatedHeight) {
                    editorTextarea.scrollTop(length / relativeHeightRatio);
                } else {
                    editorTextarea.scrollTop(length * relativeHeightRatio);
                }
            }
        });

    }

    // Public API

    return {
        setup: setup
    }

}
