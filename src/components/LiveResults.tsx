
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Candidate {
  id: string;
  name: string;
  class: string;
  slogan: string;
  photo: string;
  votes: number;
  party: string;
  partyLogo: string;
}

interface Position {
  id: string;
  title: string;
  candidates: Candidate[];
}

interface LiveResultsProps {
  positions: Position[];
}

export const LiveResults = ({ positions }: LiveResultsProps) => {
  const getLeadingCandidate = (position: Position) => {
    return position.candidates.reduce((prev, current) => 
      current.votes > prev.votes ? current : prev
    );
  };

  const getTotalVotes = (position: Position) => {
    return position.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  };

  const getVotePercentage = (candidate: Candidate, position: Position) => {
    const total = getTotalVotes(position);
    return total > 0 ? Math.round((candidate.votes / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Live Stats Header */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Users className="h-8 w-8 text-green-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-green-800">Live Vote Count</span>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">
                {positions.reduce((sum, pos) => sum + getTotalVotes(pos), 0)}
              </div>
              <div className="text-sm text-green-600">Total Votes Cast</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results by Position */}
      {positions.map((position) => {
        const leader = getLeadingCandidate(position);
        return (
          <Card key={position.id} className="shadow-2xl border-2 hover:shadow-3xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-100 to-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  {position.title}
                </CardTitle>
                <div className="flex items-center gap-3 text-green-600 bg-white px-4 py-2 rounded-full shadow-md">
                  <TrendingUp className="h-5 w-5" />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-yellow-400">
                      <AvatarImage src={leader.photo} alt={leader.name} />
                      <AvatarFallback className="text-xs font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Leading:</span>
                      <span className="font-semibold">{leader.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{leader.partyLogo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {position.candidates
                  .sort((a, b) => b.votes - a.votes)
                  .map((candidate, index) => (
                  <div key={candidate.id} className="relative overflow-hidden bg-white border-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-6 p-6">
                      {/* Rank */}
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                          index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                          'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}>
                          {index === 0 && <Trophy className="h-5 w-5" />}
                          {index !== 0 && `#${index + 1}`}
                        </div>
                      </div>

                      {/* Candidate Info with Party Logo */}
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                          <AvatarImage src={candidate.photo} alt={candidate.name} />
                          <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
                          <span className="text-xl">{candidate.partyLogo}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="font-bold text-xl text-gray-800">{candidate.name}</div>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full border shadow-sm">
                            <span className="text-sm">{candidate.partyLogo}</span>
                            <span className="text-sm font-semibold text-gray-700">{candidate.party}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Class: {candidate.class}</div>
                        <div className="text-sm text-blue-600 italic font-medium">"{candidate.slogan}"</div>
                      </div>

                      {/* Vote Count and Progress */}
                      <div className="text-right min-w-[140px]">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{candidate.votes}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          {getVotePercentage(candidate, position)}% of votes
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              index === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                              'bg-gradient-to-r from-gray-400 to-gray-500'
                            }`}
                            style={{ width: `${getVotePercentage(candidate, position)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
