import type { LeaderboardEntry } from '../types/leaderboard.types';
const MOCK: LeaderboardEntry[] = [
  {id:'1',rank:1,userId:'u1',displayName:'Luanda Pro',avatarUrl:'',weeklyXP:980,totalXP:12500},
  {id:'2',rank:2,userId:'u2',displayName:'Miss Yolanda',avatarUrl:'',weeklyXP:850,totalXP:9800},
  {id:'3',rank:3,userId:'u3',displayName:'Kizomba King',avatarUrl:'',weeklyXP:720,totalXP:7200},
  {id:'4',rank:4,userId:'u4',displayName:'Ana Lisboa',avatarUrl:'',weeklyXP:640,totalXP:6100},
  {id:'5',rank:5,userId:'u5',displayName:'Carlos Dev',avatarUrl:'',weeklyXP:590,totalXP:5400},
  {id:'6',rank:6,userId:'u6',displayName:'Pedro M.',avatarUrl:'',weeklyXP:520,totalXP:4900},
  {id:'7',rank:7,userId:'u7',displayName:'Sofia A.',avatarUrl:'',weeklyXP:480,totalXP:3800},
  {id:'8',rank:8,userId:'u8',displayName:'You',avatarUrl:'',weeklyXP:350,totalXP:1250,isCurrentUser:true},
  {id:'9',rank:9,userId:'u9',displayName:'Tomas B.',avatarUrl:'',weeklyXP:290,totalXP:2100},
  {id:'10',rank:10,userId:'u10',displayName:'Lena K.',avatarUrl:'',weeklyXP:210,totalXP:1800},
];
export class LeaderboardService {
  async getWeekly(): Promise<LeaderboardEntry[]> { await new Promise(r=>setTimeout(r,300)); return MOCK; }
}
export const leaderboardService = new LeaderboardService();
