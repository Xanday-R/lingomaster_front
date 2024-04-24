import {Languages} from "../enums/languages.enum";
import {Formats} from "../enums/formats.enum";
import {Levels} from "../enums/levels.enum";
import {ModelsPractice} from "../enums/models-practice.enum";

export const LanguagesList:Languages[] = [Languages.english, Languages.french, Languages.german, Languages.polish, Languages.ukrainian, Languages.russian, Languages.spanish];
export const FormatsList:Formats[] = [Formats.conversation, Formats.article, Formats.story, Formats.news];
export const LevelsList:Levels[] = [Levels.A1, Levels.A2, Levels.B1, Levels.B2, Levels.C1, Levels.C2];

export const ModelPracticeList: ModelsPractice[] = [ModelsPractice.insertingWordTranslation, ModelsPractice.insertingMissWords, ModelsPractice.writingWordTranslation, ModelsPractice.writingMissWords]
