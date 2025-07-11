
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, BarChart3, Settings, Users, Trophy, Plus } from 'lucide-react';
import { VotingSection } from './VotingSection';
import { LiveResults } from './LiveResults';
import { AdminPanel } from './AdminPanel';
import { VoteStats } from './VoteStats';

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

interface DashboardProps {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  votes: Record<string, string>;
  setVotes: (votes: Record<string, string>) => void;
  onSubmitVote: () => void;
  totalVoters: number;
}

export const Dashboard = ({ 
  positions, 
  setPositions, 
  votes, 
  setVotes, 
  onSubmitVote,
  totalVoters 
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vote' | 'results' | 'admin'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-2xl border-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <CardHeader className="text-center text-white">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
              <Vote className="h-10 w-10" />
              School Election Dashboard
            </CardTitle>
            <p className="text-blue-100 text-lg">Secure Digital Voting System</p>
          </CardHeader>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full h-14 bg-white shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="vote" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Vote className="h-4 w-4" />
              Cast Vote
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Trophy className="h-4 w-4" />
              Live Results
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <VoteStats positions={positions} totalVoters={totalVoters} />
          </TabsContent>

          <TabsContent value="vote">
            <VotingSection 
              positions={positions}
              votes={votes}
              setVotes={setVotes}
              onSubmitVote={onSubmitVote}
            />
          </TabsContent>

          <TabsContent value="results">
            <LiveResults positions={positions} />
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel 
              positions={positions}
              setPositions={setPositions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
