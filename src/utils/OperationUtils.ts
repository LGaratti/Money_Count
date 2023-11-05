import { Operation } from '../interfaces/Operation';
import { TimeUnit } from "../interfaces/OperationTypes";

export function isOperationExpired(operation: Operation) {
  if (
    !operation.periodic ||
    !operation.periodic.lastDate ||
    !operation.periodic.firstDate
  ) {
    return false;
  }

  const now = new Date();
  const diff = now.getTime() - operation.periodic.lastDate.getTime();

  switch (operation.periodic.unit) {
    case TimeUnit.DAY:
      return diff >= operation.periodic.amount * 24 * 60 * 60 * 1000;
    case TimeUnit.WEEK:
      return diff >= operation.periodic.amount * 7 * 24 * 60 * 60 * 1000;
    case TimeUnit.MONTH:
      // TODO: Questo è un esempio semplificato, potresti voler considerare la durata esatta dei mesi
      return diff >= operation.periodic.amount * 30 * 24 * 60 * 60 * 1000;
    case TimeUnit.YEAR:
      // TODO: Questo è un esempio semplificato, potresti voler considerare anni bisestili, ecc.
      return diff >= operation.periodic.amount * 365 * 24 * 60 * 60 * 1000;
    default:
      return false;
  }
}
