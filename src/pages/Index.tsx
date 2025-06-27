
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Vote } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  class: string;
  slogan: string;
}

interface Position {
  id: string;
  title: string;
  candidates: Candidate[];
}

const positions: Position[] = [
  {
    id: 'head-boy',
    title: 'Head Boy',
    candidates: [
      { id: 'hb1', name: 'Arjun Sharma', class: '12th A', slogan: 'Leading with Vision' },
      { id: 'hb2', name: 'Rohit Kumar', class: '12th B', slogan: 'Unity in Diversity' },
      { id: 'hb3', name: 'Karan Singh', class: '12th C', slogan: 'Excellence Together' }
    ]
  },
  {
    id: 'vice-head-boy',
    title: 'Vice Head Boy',
    candidates: [
      { id: 'vhb1', name: 'Amit Patel', class: '11th A', slogan: 'Supporting Success' },
      { id: 'vhb2', name: 'Raj Gupta', class: '11th B', slogan: 'Team Spirit First' },
      { id: 'vhb3', name: 'Dev Agarwal', class: '11th C', slogan: 'Progress Together' }
    ]
  },
  {
    id: 'head-girl',
    title: 'Head Girl',
    candidates: [
      { id: 'hg1', name: 'Priya Sharma', class: '12th A', slogan: 'Empowering Change' },
      { id: 'hg2', name: 'Sneha Joshi', class: '12th B', slogan: 'Inspiring Leadership' },
      { id: 'hg3', name: 'Kavya Reddy', class: '12th C', slogan: 'Creating Impact' }
    ]
  },
  {
    id: 'vice-head-girl',
    title: 'Vice Head Girl',
    candidates: [
      { id: 'vhg1', name: 'Anita Das', class: '11th A', slogan: 'Building Bridges' },
      { id: 'vhg2', name: 'Riya Mehta', class: '11th B', slogan: 'Positive Change' },
      { id: 'vhg3', name: 'Shruti Iyer', class: '11th C', slogan: 'Student Voice' }
    ]
  },
  {
    id: 'captain-boy',
    title: 'Captain Boy',
    candidates: [
      { id: 'cb1', name: 'Vikas Yadav', class: '10th A', slogan: 'Sports Excellence' },
      { id: 'cb2', name: 'Harsh Tiwari', class: '10th B', slogan: 'Athletic Spirit' },
      { id: 'cb3', name: 'Akash Verma', class: '10th C', slogan: 'Fitness First' }
    ]
  },
  {
    id: 'vice-captain-boy',
    title: 'Vice Captain Boy',
    candidates: [
      { id: 'vcb1', name: 'Nikhil Jain', class: '9th A', slogan: 'Team Player' },
      { id: 'vcb2', name: 'Shubham Roy', class: '9th B', slogan: 'Fair Play' },
      { id: 'vcb3', name: 'Varun Nair', class: '9th C', slogan: 'Sportsmanship' }
    ]
  },
  {
    id: 'captain-girl',
    title: 'Captain Girl',
    candidates: [
      { id: 'cg1', name: 'Deepika Singh', class: '10th A', slogan: 'Champions Rise' },
      { id: 'cg2', name: 'Pooja Bansal', class: '10th B', slogan: 'Breaking Barriers' },
      { id: 'cg3', name: 'Nisha Pandey', class: '10th C', slogan: 'Winning Together' }
    ]
  },
  {
    id: 'vice-captain-girl',
    title: 'Vice Captain Girl',
    candidates: [
      { id: 'vcg1', name: 'Sakshi Agarwal', class: '9th A', slogan: 'Dedicated Service' },
      { id: 'vcg2', name: 'Tanya Chopra', class: '9th B', slogan: 'Inspiring Others' },
      { id: 'vcg3', name: 'Meera Bhat', class: '9th C', slogan: 'Leading by Example' }
    ]
  }
];

const Index = () => {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [isVotingComplete, setIsVotingComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleVoteChange = (positionId: string, candidateId: string) => {
    setVotes(prev => ({
      ...prev,
      [positionId]: candidateId
    }));
  };

  const handleSubmitVote = () => {
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

    setIsVotingComplete(true);
    toast({
      title: "Vote Submitted Successfully!",
      description: "Your vote has been recorded. Thank you for participating in the school elections.",
    });
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl font-bold">Election Results</CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid gap-4">
            {positions.map((position) => (
              <Card key={position.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-center">{position.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {position.candidates.map((candidate, index) => (
                      <div key={candidate.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{candidate.name}</span>
                          <span className="text-sm text-gray-600 ml-2">({candidate.class})</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {Math.floor(Math.random() * 100) + 50} votes
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isVotingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Vote className="h-6 w-6" />
              Voting Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <div className="mb-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Thank You for Voting!</h3>
              <p className="text-gray-600">Your vote has been successfully recorded.</p>
            </div>
            <Button 
              onClick={handleViewResults}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Vote className="h-8 w-8" />
              School Election - EVM
            </CardTitle>
            <p className="text-blue-100 mt-2">Cast your vote for student representatives</p>
          </CardHeader>
        </Card>

        {/* Voting Instructions */}
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Voting Instructions:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Select ONE candidate for each position</li>
              <li>• You must vote for all 8 positions</li>
              <li>• Review your choices before submitting</li>
              <li>• Once submitted, votes cannot be changed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Voting Interface */}
        <div className="grid gap-6">
          {positions.map((position) => (
            <Card key={position.id} className="shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
                <CardTitle className="text-xl text-center text-gray-800">
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
                    <div key={candidate.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value={candidate.id} id={candidate.id} />
                      <Label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-lg">{candidate.name}</div>
                            <div className="text-sm text-gray-600">Class: {candidate.class}</div>
                            <div className="text-sm text-blue-600 italic">"{candidate.slogan}"</div>
                          </div>
                          <div className="text-2xl">
                            {votes[position.id] === candidate.id ? '✅' : '⭕'}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmitVote}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold shadow-lg"
          >
            Submit Vote
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Voted for {Object.keys(votes).length} out of {positions.length} positions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
