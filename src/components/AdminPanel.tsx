
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Users, Shield } from 'lucide-react';
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

interface AdminPanelProps {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
}

const partyOptions = [
  { name: 'Student Unity Party', logo: '🏛️' },
  { name: 'Progressive Alliance', logo: '⚡' },
  { name: 'Youth Forward', logo: '🚀' },
  { name: 'Athletic Champions', logo: '⚽' },
  { name: 'Sports Unity', logo: '🏆' },
  { name: 'Power Sports', logo: '💪' },
];

export const AdminPanel = ({ positions, setPositions }: AdminPanelProps) => {
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    class: '',
    slogan: '',
    photo: '',
    party: '',
    partyLogo: '',
    positionId: ''
  });
  const [editingCandidate, setEditingCandidate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.class || !newCandidate.slogan || !newCandidate.positionId || !newCandidate.party) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const candidateId = `${newCandidate.positionId}-${Date.now()}`;
    const candidate: Candidate = {
      id: candidateId,
      name: newCandidate.name,
      class: newCandidate.class,
      slogan: newCandidate.slogan,
      photo: newCandidate.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      votes: 0,
      party: newCandidate.party,
      partyLogo: newCandidate.partyLogo
    };

    setPositions(positions.map(position => 
      position.id === newCandidate.positionId 
        ? { ...position, candidates: [...position.candidates, candidate] }
        : position
    ));

    setNewCandidate({
      name: '',
      class: '',
      slogan: '',
      photo: '',
      party: '',
      partyLogo: '',
      positionId: ''
    });

    toast({
      title: "Candidate Added",
      description: `${candidate.name} has been added successfully.`,
    });
  };

  const handleDeleteCandidate = (positionId: string, candidateId: string) => {
    setPositions(positions.map(position => 
      position.id === positionId 
        ? { ...position, candidates: position.candidates.filter(c => c.id !== candidateId) }
        : position
    ));

    toast({
      title: "Candidate Removed",
      description: "Candidate has been removed successfully.",
    });
  };

  const handlePartyChange = (partyName: string) => {
    const selectedPartyx = partyOptions.find(p => p.name === partyName);
    setNewCandidate(prev => ({
      ...prev,
      party: partyName,
      partyLogo: selectedPartyx?.logo || ''
    }));
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Shield className="h-8 w-8" />
            Election Administration Panel
          </CardTitle>
          <p className="text-orange-100">Manage candidates and election settings</p>
        </CardHeader>
      </Card>

      {/* Add New Candidate */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Candidate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter candidate's full name"
              />
            </div>
            <div>
              <Label htmlFor="class">Class *</Label>
              <Input
                id="class"
                value={newCandidate.class}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, class: e.target.value }))}
                placeholder="e.g., 12th A"
              />
            </div>
            <div>
              <Label htmlFor="position">Position *</Label>
              <Select onValueChange={(value) => setNewCandidate(prev => ({ ...prev, positionId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map(position => (
                    <SelectItem key={position.id} value={position.id}>
                      {position.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="party">Party *</Label>
              <Select onValueChange={handlePartyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select party" />
                </SelectTrigger>
                <SelectContent>
                  {partyOptions.map(party => (
                    <SelectItem key={party.name} value={party.name}>
                      <div className="flex items-center gap-2">
                        <span>{party.logo}</span>
                        <span>{party.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="photo">Photo URL (optional)</Label>
              <Input
                id="photo"
                value={newCandidate.photo}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, photo: e.target.value }))}
                placeholder="Enter photo URL or leave blank for default"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="slogan">Campaign Slogan *</Label>
              <Textarea
                id="slogan"
                value={newCandidate.slogan}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, slogan: e.target.value }))}
                placeholder="Enter candidate's campaign slogan"
                rows={2}
              />
            </div>
          </div>
          <Button onClick={handleAddCandidate} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </CardContent>
      </Card>

      {/* Current Candidates */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Current Candidates
        </h3>
        {positions.map(position => (
          <Card key={position.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{position.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {position.candidates.map(candidate => (
                  <div key={candidate.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                        <AvatarImage src={candidate.photo} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                        <span className="text-sm">{candidate.partyLogo}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{candidate.name}</h4>
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border">
                          <span className="text-xs">{candidate.partyLogo}</span>
                          <span className="text-xs font-medium">{candidate.party}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Class: {candidate.class}</p>
                      <p className="text-sm text-blue-600 italic">"{candidate.slogan}"</p>
                      <p className="text-sm text-green-600 font-semibold">Votes: {candidate.votes}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCandidate(candidate.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCandidate(position.id, candidate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {position.candidates.length === 0 && (
                  <p className="text-gray-500 italic text-center py-4">No candidates added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
