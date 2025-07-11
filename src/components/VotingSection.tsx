import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Vote, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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

interface VotingSectionProps {
  positions: Position[];
  votes: Record<string, string>;
  setVotes: (votes: Record<string, string>) => void;
  onSubmitVote: () => void;
}

export const VotingSection = ({ positions, votes, setVotes, onSubmitVote }: VotingSectionProps) => {
  const { toast } = useToast();

  const handleVoteChange = (positionId: string, candidateId: string) => {
    const newVotes = {
      ...votes,
      [positionId]: candidateId
    };
    setVotes(newVotes);
  };

  const handleSubmit = () => {
    const totalPositions = positions.length;
    const votedPositions = Object.keys(votes).length;

    if (votedPositions < totalPositions) {
      toast({
        title: "Incomplete Voting",
        description: `Please vote for all ${totalPositions} positions. You have voted for ${votedPositions} positions.`,
        variant: "destructive"
      });
      return;
    }

    onSubmitVote();
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">📋 Voting Instructions:</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Select exactly ONE candidate for each position</li>
                <li>• You must vote for all {positions.length} positions to submit your ballot</li>
                <li>• Review your choices carefully before submitting</li>
                <li>• Once submitted, votes cannot be changed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting Cards */}
      <div className="grid gap-6">
        {positions.map((position) => (
          <Card key={position.id} className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
              <CardTitle className="text-2xl text-center text-gray-800 flex items-center justify-center gap-2">
                <Vote className="h-6 w-6" />
                {position.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={votes[position.id] || ''}
                onValueChange={(value) => handleVoteChange(position.id, value)}
                className="space-y-4"
              >
                {position.candidates.map((candidate) => (
                  <div key={candidate.id} className={`group relative overflow-hidden border-2 rounded-xl transition-all duration-300 cursor-pointer ${
                    votes[position.id] === candidate.id 
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md'
                  }`}>
                    <div className="flex items-center p-6 gap-6">
                      <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1 scale-125" />
                      
                      {/* Candidate Photo with Party Logo */}
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                          <AvatarImage src={candidate.photo} alt={candidate.name} className="object-cover" />
                          <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
                          <span className="text-2xl">{candidate.partyLogo}</span>
                        </div>
                      </div>

                      <Label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-2xl text-gray-800">{candidate.name}</h3>
                            {votes[position.id] === candidate.id && (
                              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                                ✓ SELECTED
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full border shadow-sm">
                              <span className="text-lg">{candidate.partyLogo}</span>
                              <span className="font-semibold text-gray-700">{candidate.party}</span>
                            </div>
                            <span className="text-gray-600 bg-gray-100 px-3 py-2 rounded-full text-sm">
                              Class: {candidate.class}
                            </span>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                            <p className="text-blue-800 italic font-medium text-lg">"{candidate.slogan}"</p>
                          </div>
                          
                          <p className="text-xs text-gray-500">Current votes: {candidate.votes}</p>
                        </div>
                      </Label>

                      <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                        {votes[position.id] === candidate.id ? '✅' : '⭕'}
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Section */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-700">
              Progress: {Object.keys(votes).length} of {positions.length} positions voted
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(votes).length / positions.length) * 100}%` }}
              ></div>
            </div>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Vote className="h-6 w-6 mr-3" />
              Submit My Vote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
