import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  isNextDayToday(lastEntry: Date): boolean {
    const lastEntryDate = new Date(lastEntry);
    const nextDay = new Date(lastEntryDate);
    nextDay.setDate(lastEntryDate.getDate() + 1);
    
    const today = new Date();
    
    return this.isSameDay(nextDay, today);
  }

  isToday(date: Date): boolean {
    return this.isSameDay(new Date(date), new Date());
  }

  isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.isSameDay(new Date(date), yesterday);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}