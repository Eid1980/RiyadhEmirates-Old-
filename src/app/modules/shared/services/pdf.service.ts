import { Injectable } from '@angular/core';


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  makePDF(action = 'open' , document : any , isRTL : boolean) {
    console.log('makePDF')

    pdfMake.fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      },
      /*Cairo:{
        normal: '/assets/fonts/Cairo/static/Cairo-Regular.ttf',
        bold: '/assets/fonts/Cairo/static/Cairo-Regular.ttf',
        italics: '/assets/fonts/Cairo/static/Cairo-Regular.ttf',
        bolditalics: '/assets/fonts/Cairo/static/Cairo-Regular.ttf'
      }*/
      TimesNewRoman: {
        normal: 'Times-New-Roman-Regular.ttf',
        bold: 'Times-New-Roman-Bold.ttf',
        italics: 'Times-New-Roman-Italic.ttf',
        bolditalics: 'Times-New-Roman-BoldItalic.ttf'
      }

    }
    var docDefinition = {
      /*defaultStyle: {
        font: 'Cairo'
      },*/
      content: [

        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        {
          text: [

            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            { text : 'than the محممود.' , font: 'TimesNewRoman'}

          ]
        }
      ]
    };

    if(action === 'open'){
      pdfMake.createPdf(docDefinition).open();
    }

  }
}
