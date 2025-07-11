
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, Vote, TrendingUp } from 'lucide-react';
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

interface VoteStatsProps {
  positions: Position[];
  totalVoters: number;
}

export const VoteStats = ({ positions, totalVoters }: VoteStatsProps) => {
  const getTotalVotes = () => {
    return positions.reduce((sum, position) => 
      sum + position.candidates.reduce((posSum, candidate) => posSum + candidate.votes, 0), 0
    );
  };

  const getLeadingCandidate = (position: Position) => {
    return position.candidates.reduce((prev, current) => 
      current.votes > prev.votes ? current : prev
    );
  };

  const getTopCandidates = () => {
    const allCandidates = positions.flatMap(pos => pos.candidates);
    return allCandidates
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 3);
  };

  const totalVotes = getTotalVotes();
  const topCandidates = getTopCandidates();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Votes</p>
                <p className="text-3xl font-bold">{totalVotes}</p>
              </div>
              <Vote className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Voters</p>
                <p className="text-3xl font-bold">{totalVoters}</p>
              </div>
              <Users className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Positions</p>
                <p className="text-3xl font-bold">{positions.length}</p>
              </div>
              <Trophy className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Turnout</p>
                <p className="text-3xl font-bold">{Math.round((totalVotes / (totalVoters * positions.length)) * 100)}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Position Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Current Leaders by Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {positions.map((position) => {
              const leader = getLeadingCandidate(position);
              return (
                <div key={position.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <Avatar className="h-12 w-12 border-2 border-yellow-400">
                    <AvatarImage src={leader.photo} alt={leader.name} />
                    <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{leader.name}</span>
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border">
                        <span className="text-sm">{leader.partyLogo}</span>
                        <span className="text-xs font-medium text-gray-700">{leader.party}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{position.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">{leader.votes}</div>
                    <div className="text-xs text-gray-500">votes</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Candidates Overall
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCandidates.map((candidate, index) => (
              <div key={candidate.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.photo} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{candidate.name}</span>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border">
                      <span className="text-sm">{candidate.partyLogo}</span>
                      <span className="text-xs font-medium text-gray-700">{candidate.party}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{candidate.class}</p>
                </div>
                <div className="text-xl font-bold text-purple-600">{candidate.votes}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
