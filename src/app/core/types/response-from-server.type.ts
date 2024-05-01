import {Languages} from '../enums/languages.enum';
import {ModelsPractice} from '../enums/models-practice.enum';

export interface ResponseFromServer {
  statusCode: number,
  error: string,
  message: string | string[],
  token?: string,
  info?: {login: string, img: string, email: string, native_language: Languages},
  data?:IWord[] | IText[],
  generatedText?: string,
  translatedText?: string,
  correctedText?: string,
  text?: string,
  model?: ModelsPractice,
  words?: string[],
  answers?: {answer: string,original:string, mustReplacePosition: {begin: number, end: number}, userAnswer: string, isCorrectAnswer: boolean}[],
  essay?: string,
  ai_correct_essay?: string,
  checkedAnswers?: boolean,
  finished?: boolean,
  id_text?: boolean,
  languageText?: Languages,
}

export interface IWord {
  id: number,
  id_user: number,
  language_word: Languages,
  word: string,
  translation: string
}

export interface IText {
  id: number,
  id_user: number,
  name: string
  language_text: Languages,
  text: string,
}
