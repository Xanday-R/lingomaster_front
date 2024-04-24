import {ModelsPractice} from "../enums/models-practice.enum";
import {ResponseFromServer} from "../types/response-from-server.type";

export function getText(model: ModelsPractice, text:string, answers:ResponseFromServer['answers']) {
  const tag = (model == ModelsPractice.insertingWordTranslation || model == ModelsPractice.insertingMissWords) ? 'inserting' :'writing'
  let newText:any[] =[];
  let change = 0;
  answers!.forEach((value, index) => {
    const buff = text.slice(change, value.mustReplacePosition.begin-1);
    const isAbzac = buff.indexOf('\n');
    if(isAbzac != -1) {
      newText = newText.concat(buff.slice(0, isAbzac-1).split(' '));
      newText.push('\n');
      newText = newText.concat(buff.slice(isAbzac+1).split(' '));
    }else newText = newText.concat(buff.split(' '));
    newText.push({tag: tag, text: model == ModelsPractice.insertingWordTranslation || model == ModelsPractice.writingWordTranslation  ? value.original : '', rightAnswer: value.answer , userAnswer: value.userAnswer, isCorrectAnswer: value.isCorrectAnswer, id_input: index});
    change = value.mustReplacePosition.end+1;
  });
  newText = newText.concat(text.slice(change).split(' '));
  return newText;
}
