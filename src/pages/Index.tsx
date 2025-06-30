import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Vote, BarChart3, Users, Trophy } from 'lucide-react';
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

const initialPositions: Position[] = [
  {
    id: 'head-boy',
    title: 'Head Boy',
    candidates: [
      { id: 'hb1', name: 'Arjun Sharma', class: '12th A', slogan: 'Leading with Vision', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', votes: 45, party: 'Student Unity Party', partyLogo: '🏛️' },
      { id: 'hb2', name: 'Rohit Kumar', class: '12th B', slogan: 'Unity in Diversity', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', votes: 38, party: 'Progressive Alliance', partyLogo: '⚡' },
      { id: 'hb3', name: 'Karan Singh', class: '12th C', slogan: 'Excellence Together', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', votes: 52, party: 'Youth Forward', partyLogo: '🚀' }
    ]
  },
  {
    id: 'vice-head-boy',
    title: 'Vice Head Boy',
    candidates: [
      { id: 'vhb1', name: 'Amit Patel', class: '11th A', slogan: 'Supporting Success', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', votes: 41, party: 'Student Unity Party', partyLogo: '🏛️' },
      { id: 'vhb2', name: 'Raj Gupta', class: '11th B', slogan: 'Team Spirit First', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', votes: 49, party: 'Progressive Alliance', partyLogo: '⚡' },
      { id: 'vhb3', name: 'Dev Agarwal', class: '11th C', slogan: 'Progress Together', photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face', votes: 35, party: 'Youth Forward', partyLogo: '🚀' }
    ]
  },
  {
    id: 'head-girl',
    title: 'Head Girl',
    candidates: [
      { id: 'hg1', name: 'Priya Sharma', class: '12th A', slogan: 'Empowering Change', photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c22b?w=150&h=150&fit=crop&crop=face', votes: 58, party: 'Student Unity Party', partyLogo: '🏛️' },
      { id: 'hg2', name: 'Sneha Joshi', class: '12th B', slogan: 'Inspiring Leadership', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', votes: 43, party: 'Progressive Alliance', partyLogo: '⚡' },
      { id: 'hg3', name: 'Kavya Reddy', class: '12th C', slogan: 'Creating Impact', photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face', votes: 37, party: 'Youth Forward', partyLogo: '🚀' }
    ]
  },
  {
    id: 'vice-head-girl',
    title: 'Vice Head Girl',
    candidates: [
      { id: 'vhg1', name: 'Anita Das', class: '11th A', slogan: 'Building Bridges', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face', votes: 44, party: 'Student Unity Party', partyLogo: '🏛️' },
      { id: 'vhg2', name: 'Riya Mehta', class: '11th B', slogan: 'Positive Change', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face', votes: 51, party: 'Progressive Alliance', partyLogo: '⚡' },
      { id: 'vhg3', name: 'Shruti Iyer', class: '11th C', slogan: 'Student Voice', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face', votes: 29, party: 'Youth Forward', partyLogo: '🚀' }
    ]
  },
  {
    id: 'captain-boy',
    title: 'Captain Boy',
    candidates: [
      { id: 'cb1', name: 'Vikas Yadav', class: '10th A', slogan: 'Sports Excellence', photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face', votes: 47, party: 'Athletic Champions', partyLogo: '⚽' },
      { id: 'cb2', name: 'Harsh Tiwari', class: '10th B', slogan: 'Athletic Spirit', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face', votes: 39, party: 'Sports Unity', partyLogo: '🏆' },
      { id: 'cb3', name: 'Akash Verma', class: '10th C', slogan: 'Fitness First', photo: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=150&h=150&fit=crop&crop=face', votes: 55, party: 'Power Sports', partyLogo: '💪' }
    ]
  },
  {
    id: 'vice-captain-boy',
    title: 'Vice Captain Boy',
    candidates: [
      { id: 'vcb1', name: 'Nikhil Jain', class: '9th A', slogan: 'Team Player', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face', votes: 42, party: 'Athletic Champions', partyLogo: '⚽' },
      { id: 'vcb2', name: 'Shubham Roy', class: '9th B', slogan: 'Fair Play', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', votes: 46, party: 'Sports Unity', partyLogo: '🏆' },
      { id: 'vcb3', name: 'Varun Nair', class: '9th C', slogan: 'Sportsmanship', photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face', votes: 33, party: 'Power Sports', partyLogo: '💪' }
    ]
  },
  {
    id: 'captain-girl',
    title: 'Captain Girl',
    candidates: [
      { id: 'cg1', name: 'Deepika Singh', class: '10th A', slogan: 'Champions Rise', photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face', votes: 53, party: 'Athletic Champions', partyLogo: '⚽' },
      { id: 'cg2', name: 'Pooja Bansal', class: '10th B', slogan: 'Breaking Barriers', photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face', votes: 41, party: 'Sports Unity', partyLogo: '🏆' },
      { id: 'cg3', name: 'Nisha Pandey', class: '10th C', slogan: 'Winning Together', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', votes: 36, party: 'Power Sports', partyLogo: '💪' }
    ]
  },
  {
    id: 'vice-captain-girl',
    title: 'Vice Captain Girl',
    candidates: [
      { id: 'vcg1', name: 'Sakshi Agarwal', class: '9th A', slogan: 'Dedicated Service', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', votes: 48, party: 'Athletic Champions', partyLogo: '⚽' },
      { id: 'vcg2', name: 'Tanya Chopra', class: '9th B', slogan: 'Inspiring Others', photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face', votes: 37, party: 'Sports Unity', partyLogo: '🏆' },
      { id: 'vcg3', name: 'Meera Bhat', class: '9th C', slogan: 'Leading by Example', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', votes: 40, party: 'Power Sports', partyLogo: '💪' }
    ]
  }
];

const Index = () => {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [isVotingComplete, setIsVotingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'voting' | 'results'>('voting');
  const [totalVoters] = useState(246);
  const { toast } = useToast();

  // Simulate real-time vote updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => 
        prevPositions.map(position => ({
          ...position,
          candidates: position.candidates.map(candidate => ({
            ...candidate,
            votes: candidate.votes + Math.floor(Math.random() * 3) // Random increment 0-2
          }))
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

    // Simulate adding the vote to the live count
    setPositions(prevPositions => 
      prevPositions.map(position => ({
        ...position,
        candidates: position.candidates.map(candidate => ({
          ...candidate,
          votes: votes[position.id] === candidate.id ? candidate.votes + 1 : candidate.votes
        }))
      }))
    );

    setIsVotingComplete(true);
    toast({
      title: "Vote Submitted Successfully!",
      description: "Your vote has been recorded and added to the live count. Thank you for participating!",
    });
  };

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

  if (isVotingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-2xl animate-scale-in">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Vote className="h-6 w-6" />
              Voting Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">✅</div>
              <h3 className="text-xl font-semibold mb-2">Thank You for Voting!</h3>
              <p className="text-gray-600">Your vote has been successfully recorded and added to the live count.</p>
            </div>
            <Button 
              onClick={() => setActiveTab('results')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Live Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Tabs */}
        <Card className="mb-6 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
              <Vote className="h-8 w-8" />
              School Election - EVM System
            </CardTitle>
            <div className="flex justify-center gap-4">
              <Button
                variant={activeTab === 'voting' ? 'default' : 'outline'}
                onClick={() => setActiveTab('voting')}
                className="bg-white/20 hover:bg-white/30 border-white/50"
              >
                <Vote className="h-4 w-4 mr-2" />
                Cast Vote
              </Button>
              <Button
                variant={activeTab === 'results' ? 'default' : 'outline'}
                onClick={() => setActiveTab('results')}
                className="bg-white/20 hover:bg-white/30 border-white/50"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Live Results
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Live Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-semibold text-green-800">Live Vote Count</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {positions.reduce((sum, pos) => sum + getTotalVotes(pos), 0)}
                    </div>
                    <div className="text-sm text-green-600">Total Votes Cast</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {positions.map((position) => {
              const leader = getLeadingCandidate(position);
              return (
                <Card key={position.id} className="shadow-lg border-2 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-800">{position.title}</CardTitle>
                      <div className="flex items-center gap-2 text-green-600">
                        <Trophy className="h-5 w-5" />
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={leader.photo} alt={leader.name} />
                            <AvatarFallback className="text-xs">{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">Leading: {leader.name}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {position.candidates
                        .sort((a, b) => b.votes - a.votes)
                        .map((candidate, index) => (
                        <div key={candidate.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
                          <div className="flex items-center gap-1 text-lg font-bold text-gray-500 min-w-[24px]">
                            {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                            #{index + 1}
                          </div>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={candidate.photo} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-semibold text-lg">{candidate.name}</div>
                              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                <span className="text-sm">{candidate.partyLogo}</span>
                                <span className="text-xs font-medium text-gray-700">{candidate.party}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">Class: {candidate.class}</div>
                            <div className="text-sm text-blue-600 italic">"{candidate.slogan}"</div>
                          </div>
                          <div className="text-right min-w-[120px]">
                            <div className="text-2xl font-bold text-blue-600">{candidate.votes}</div>
                            <div className="text-sm text-gray-600">
                              {getVotePercentage(candidate, position)}% of votes
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${getVotePercentage(candidate, position)}%` }}
                              ></div>
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
        )}

        {/* Voting Tab */}
        {activeTab === 'voting' && (
          <>
            {/* Voting Instructions */}
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">📋 Voting Instructions:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Select ONE candidate for each position by clicking on their photo or name</li>
                  <li>• You must vote for all 8 positions to submit your ballot</li>
                  <li>• Review your choices carefully before submitting</li>
                  <li>• Once submitted, votes cannot be changed and will be added to live results</li>
                </ul>
              </CardContent>
            </Card>

            {/* Voting Interface */}
            <div className="grid gap-6">
              {positions.map((position) => (
                <Card key={position.id} className="shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
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
                        <div key={candidate.id} className={`flex items-center space-x-4 p-4 border-2 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md ${
                          votes[position.id] === candidate.id 
                            ? 'border-blue-500 bg-blue-50 shadow-lg' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}>
                          <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                            <AvatarImage src={candidate.photo} alt={candidate.name} className="object-cover" />
                            <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <div className="font-bold text-xl text-gray-800">{candidate.name}</div>
                                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <span className="text-sm">{candidate.partyLogo}</span>
                                    <span className="text-xs font-medium text-gray-700">{candidate.party}</span>
                                  </div>
                                  {votes[position.id] === candidate.id && (
                                    <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                      SELECTED
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">Class: {candidate.class}</div>
                                <div className="text-sm text-blue-600 italic font-medium">"{candidate.slogan}"</div>
                                <div className="text-xs text-gray-500 mt-2">Current votes: {candidate.votes}</div>
                              </div>
                              <div className="text-4xl">
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
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Vote className="h-5 w-5 mr-2" />
                Submit Vote
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Voted for {Object.keys(votes).length} out of {positions.length} positions
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
