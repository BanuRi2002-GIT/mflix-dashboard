import { Award, Users, Film, Ticket } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Film,
      title: "Extensive Collection",
      description: "Access thousands of movies from various genres and eras.",
    },
    {
      icon: Ticket,
      title: "Easy Booking",
      description: "Book tickets seamlessly with our user-friendly interface.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a community of movie enthusiasts and share your thoughts.",
    },
    {
      icon: Award,
      title: "Curated Selection",
      description: "Hand-picked movies ensuring the best viewing experience.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          About CineScope
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your premier destination for discovering and booking the best movies in town.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-card rounded-2xl border p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          At CineScope, we believe that great movies have the power to inspire, entertain, and bring people together. 
          Our mission is to make the magic of cinema accessible to everyone by providing a seamless platform for 
          discovering and booking movies. We curate the best films from around the world and bring them to your 
          local theaters, ensuring you never miss out on the cinematic experiences that matter.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-card rounded-xl border p-6 text-center hover:border-primary transition-colors group">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2024, CineScope started as a passion project by a group of movie enthusiasts who wanted 
              to create a better way for people to discover and book movies. What began as a simple idea has grown 
              into a comprehensive platform serving thousands of movie lovers.
            </p>
            <p>
              Today, we partner with theaters across the country to bring you the widest selection of films, 
              from blockbuster hits to independent gems. Our team works tirelessly to ensure that your movie-going 
              experience is nothing short of exceptional.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold text-primary mb-2">10,000+</h3>
          <p className="text-muted-foreground">Movies in Collection</p>
          <div className="h-px w-20 bg-primary/20 mx-auto my-4" />
          <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
          <p className="text-muted-foreground">Partner Theaters</p>
          <div className="h-px w-20 bg-primary/20 mx-auto my-4" />
          <h3 className="text-3xl font-bold text-primary mb-2">100K+</h3>
          <p className="text-muted-foreground">Happy Customers</p>
        </div>
      </div>
    </div>
  );
}
