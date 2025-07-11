import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Vote } from 'lucide-react';
import { Dashboard } from '@/components/Dashboard';

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
            votes: candidate.votes + Math.floor(Math.random() * 3)
          }))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

    // Check if user has already voted for any position (single vote per position enforcement)
    const hasVoted = Object.keys(votes).some(positionId => votes[positionId]);
    if (hasVoted && votedPositions === totalPositions) {
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
    }
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Dashboard 
      positions={positions}
      setPositions={setPositions}
      votes={votes}
      setVotes={setVotes}
      onSubmitVote={handleSubmitVote}
      totalVoters={totalVoters}
    />
  );
};

export default Index;
