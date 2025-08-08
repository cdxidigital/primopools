import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

  const showModal = () => {
    if (!exitIntentTriggered) {
      setIsOpen(true);
      setExitIntentTriggered(true);
    }
  };

  const handleDownload = () => {
    // Simulate PDF download
    alert("Thank you! Your Pool Planning Checklist will be sent to your email shortly.");
    setIsOpen(false);
  };

  useEffect(() => {
    // Trigger modal on scroll (70% of page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 70 && !exitIntentTriggered) {
        showModal();
      }
    };

    // Trigger modal on mouse leave (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !window.matchMedia('(max-width: 768px)').matches) {
        showModal();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentTriggered]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-morphism border-white/20 max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
            <i className="fas fa-gift"></i>
          </div>
          <h3 className="text-2xl font-cabinet font-bold text-deep-blue mb-4">
            Wait! Get Your Free Pool Planning Checklist
          </h3>
          <p className="text-gray-600 mb-6">
            Download our comprehensive pool planning guide with everything you need to know before starting your project.
          </p>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-turquoise focus:ring-turquoise/20"
            />
            <Button 
              onClick={handleDownload}
              className="w-full bg-turquoise text-white hover:bg-opacity-90"
            >
              Download Free Guide
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="w-full text-gray-500 hover:text-gray-700"
            >
              No thanks, I'll browse more
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
