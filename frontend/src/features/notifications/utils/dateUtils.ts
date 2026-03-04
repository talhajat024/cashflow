import { isToday,isYesterday,isThisWeek,formatDistanceToNow } from "date-fns";

// format a date to relative time string (e.g, "30 minutes ago","2 days ago")
export const formatNotificationTime=(date:Date):string=>{
    return formatDistanceToNow(date,{addSuffix:true});
};

// Group a date into categories :Today,Yesterday,This Week,or Older
export const getNotificationGroup=(date:Date):string=>{
    if(isToday(date)) return 'Today';
    if(isYesterday(date)) return 'Yesterday';
    if(isThisWeek(date)) return 'This Week';
    return 'Older';
};

// Group an array of items with timestamps by date categories
export const groupNotificationsByDate = <T extends { timestamp: Date }>(
  items: T[]
): { date: string; items: T[] }[] => {
  const groups: { [key: string]: T[] } = {};
  
  items.forEach(item => {
    const groupKey = getNotificationGroup(item.timestamp);
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
  });
  
  // Convert to array and sort by priority (Today first, then Yesterday, etc.)
  const priorityOrder = ['Today', 'Yesterday', 'This Week', 'Older'];
  
  return Object.entries(groups)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => {
      return priorityOrder.indexOf(a.date) - priorityOrder.indexOf(b.date);
    });
};

// check if notification is from today
export const isFromToday=(date:Date):boolean=>{
    return isToday(date);
}

// check if notification is from yesterday
export const isFromYesterday=(date:Date):boolean=>{
    return isYesterday(date);
}

export const getFormattedDate=(date:Date):string=>{
    return date.toLocaleDateString('en-US',{
        month:'short',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    });
};



