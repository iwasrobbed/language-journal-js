//
// Takes input text and (eventually) batches it into
// streaming audio requests since Polly can only handle
// 1500 characters per request
//

const AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');

export const Speech = () => {

    // Private API

    const listAvailableVoices = () => {
        const polly = new AWS.Polly();

        polly.describeVoices({}, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                const voices = data.Voices;
                const voiceCount = voices.length;
                var i = 0;
                for (; i < voiceCount; i++) {
                    const voice = voices[i];
                    console.log('id: ' + voice.Id +
                                ' language code: ' + voice.LanguageCode +
                                ' name ' + voice.Name);
                }
            }
        });
    }

    const speakText = (text) => {
        if (!text) {
            console.log("No text given to speak, so returning");
            return;
        }
        if (typeof text !== 'string') {
            throw 'Bad input value for speech text parameter: ' + typeof text
        }

        const polly = new AWS.Polly();

        const params = {
            'Text': text,
            'OutputFormat': 'pcm',
            'VoiceId': 'Celine'
        }

        const speaker = new Speaker({
          channels: 1,
          bitDepth: 16,
          sampleRate: 16000
        });

        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code)
            } else if (data && data.AudioStream instanceof Buffer) {
                // Initiate the source and decoder
                var bufferStream = new Stream.PassThrough();

                // convert AudioStream into a readable stream
                bufferStream.end(data.AudioStream);

                // Play it in the speaker
                bufferStream.pipe(speaker);
            }
        })
    }

    // Public API

    return {
        listAvailableVoices: listAvailableVoices,
        speakText: speakText
    }
}
