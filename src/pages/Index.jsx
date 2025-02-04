import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Paw, Heart, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and hiss.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive appearance and vocal nature." },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Recognized for their long, luxurious coat and sweet personality." },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domestic cat breeds with a gentle temperament." },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Wild-looking cats known for their spotted or marbled coat patterns." },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", description: "Characterized by their unique folded ears and round faces." },
];

const Index = () => {
  const [catFact, setCatFact] = useState("");
  const [email, setEmail] = useState("");
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [catOfTheDay, setCatOfTheDay] = useState(0);
  const [isChangingBreed, setIsChangingBreed] = useState(false);
  const [likedBreeds, setLikedBreeds] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatOfTheDay((prev) => (prev + 1) % catBreeds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 10, 100);
        if (newProgress === 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const generateCatFact = useCallback(() => {
    const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    setCatFact(randomFact);
  }, []);

  const handleNextBreed = useCallback(() => {
    setIsChangingBreed(true);
    setTimeout(() => {
      setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
      setIsChangingBreed(false);
    }, 300);
  }, []);

  const handlePrevBreed = useCallback(() => {
    setIsChangingBreed(true);
    setTimeout(() => {
      setCurrentBreedIndex((prevIndex) => (prevIndex - 1 + catBreeds.length) % catBreeds.length);
      setIsChangingBreed(false);
    }, 300);
  }, []);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  }, []);

  const toggleLike = useCallback((index) => {
    setLikedBreeds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Paw className="mr-2" />
            CatWorld
          </h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Gallery</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="fixed bottom-4 right-4 z-20">
        <Progress value={loadingProgress} className="w-24 h-2" />
      </div>

      <div className="flex-grow pt-16">
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold text-white shadow-lg mb-4"
            >
              All About Cats
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-white shadow-md"
            >
              Discover the fascinating world of felines
            </motion.p>
          </div>
        </div>

        <motion.div 
          className="absolute top-1/2 left-10 transform -translate-y-1/2"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Paw size={48} color="white" />
        </motion.div>
        
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Independent nature</li>
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially hearing and night vision</li>
                  <li>Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Explore different cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {catBreeds.map((breed, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <img
                            src={breed.image}
                            alt={breed.name}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                            <p className="text-center text-lg font-semibold">{breed.name}</p>
                          </div>
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              className={`rounded-full ${likedBreeds.has(index) ? 'bg-red-500 text-white' : 'bg-white text-gray-800'}`}
                              onClick={() => toggleLike(index)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full bg-white text-gray-800"
                              onClick={() => toast.success(`Shared ${breed.name}!`)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{breed.description}</p>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12 overflow-hidden">
            <CardHeader>
              <CardTitle>Cat of the Day</CardTitle>
              <CardDescription>A new adorable cat every few seconds!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-64">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={catOfTheDay}
                    src={catBreeds[catOfTheDay].image}
                    alt={catBreeds[catOfTheDay].name}
                    className="w-full h-full object-cover rounded-lg"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 rounded-b-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-center text-lg font-semibold">{catBreeds[catOfTheDay].name}</p>
                  <p className="text-center text-sm mt-1">{catBreeds[catOfTheDay].description}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Cat Fact Generator</CardTitle>
              <CardDescription>Click the button to learn a random cat fact!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={generateCatFact} className="bg-purple-600 hover:bg-purple-700">Generate Cat Fact</Button>
              <AnimatePresence mode="wait">
                {catFact && (
                  <motion.p
                    key={catFact}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-gray-100 rounded-lg"
                  >
                    {catFact}
                  </motion.p>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-pink-100">
            <CardHeader>
              <CardTitle className="text-purple-800">Subscribe to Cat Facts</CardTitle>
              <CardDescription className="text-pink-700">Get daily cat facts delivered to your inbox!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
                  Subscribe
                </Button>
              </form>
              <div className="mt-4 flex justify-center space-x-2">
                <Badge variant="secondary">Daily Facts</Badge>
                <Badge variant="secondary">Cat Care Tips</Badge>
                <Badge variant="secondary">Cute Pictures</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 CatWorld. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Instagram /></a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Facebook /></a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Twitter /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
