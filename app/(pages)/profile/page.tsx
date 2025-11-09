import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, Star, Bookmark, Edit3, type LucideIcon } from "lucide-react";

// Mock user data - in a real app, this would come from authentication/database
const mockUserData = {
  name: "James Santino",
  email: "james.santino@example.com",
  username: "jamessantino",
  avatar: null,
  joinDate: "January 2024",
  favoriteTeam: "Los Angeles Lakers",
  bio: "Basketball enthusiast and stats lover. Following the NBA since 2010.",
  stats: {
    favoriteTeams: 3,
    savedGames: 12,
    postsCreated: 8,
  },
};

// Reusable StatCard Component
function StatCard({
  icon: Icon,
  value,
  label,
  filled = false
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  filled?: boolean;
}) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border shadow-md bg-card group">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-brand to-brand-hover rounded-xl shadow-lg">
            <Icon className={`w-6 h-6 text-brand-foreground ${filled ? 'fill-current' : ''}`} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable PreferenceItem Component
function PreferenceItem({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/30 -mx-6 px-6 transition-colors">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
    </label>
  );
}

async function ProfileContent() {
  // Simulate async data fetch
  await new Promise((resolve) => setTimeout(resolve, 100));
  const user = mockUserData;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="border-border shadow-lg bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-brand-foreground text-3xl font-bold shadow-xl ring-4 ring-border">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1 text-foreground">{user.name}</h1>
              <p className="text-muted-foreground mb-2 font-medium">@{user.username}</p>
              <p className="text-muted-foreground mb-4">{user.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-brand" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-brand" />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex-shrink-0">
              <button className="px-4 py-2 bg-brand hover:bg-brand-hover text-brand-foreground rounded-lg transition-all font-medium shadow-md hover:shadow-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Star}
          value={user.stats.favoriteTeams}
          label="Favorite Teams"
          filled
        />
        <StatCard
          icon={Bookmark}
          value={user.stats.savedGames}
          label="Saved Games"
          filled
        />
        <StatCard
          icon={Edit3}
          value={user.stats.postsCreated}
          label="Posts Created"
        />
      </div>

      {/* Preferences */}
      <Card className="border-border shadow-lg bg-card">
        <CardHeader className="bg-muted/50 rounded-t-lg">
          <CardTitle className="text-xl text-foreground">Preferences</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-0">
            <PreferenceItem
              title="Favorite Team"
              description={user.favoriteTeam}
              action={
                <button className="px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-brand-foreground text-sm font-medium shadow-sm transition-all">
                  Change
                </button>
              }
            />
            <PreferenceItem
              title="Email Notifications"
              description="Receive game updates"
              action={<ToggleSwitch defaultChecked />}
            />
            <PreferenceItem
              title="Dark Mode"
              description="Toggle dark theme"
              action={<ToggleSwitch />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 m-10 bg-background min-h-screen">
      <Suspense
        fallback={
          <div className="space-y-8 animate-pulse">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-full bg-surface-secondary"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-surface-secondary rounded w-1/3"></div>
                    <div className="h-4 bg-surface-secondary rounded w-1/4"></div>
                    <div className="h-4 bg-surface-secondary rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="h-20 bg-surface-secondary rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-card border-border">
              <CardHeader className="bg-muted/50 rounded-t-lg">
                <div className="h-6 bg-card rounded w-1/4"></div>
                <div className="h-4 bg-card rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="h-16 bg-surface-secondary rounded"></div>
                <div className="h-16 bg-surface-secondary rounded"></div>
                <div className="h-16 bg-surface-secondary rounded"></div>
              </CardContent>
            </Card>
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </div>
  );
}
