import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Homepage = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Review App Homepage</h1>

      {/* Accordion for Q&A */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this app about?</AccordionTrigger>
          <AccordionContent>
            This app allows users to review and rate products.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How can I leave a review?</AccordionTrigger>
          <AccordionContent>
            Click on the 'Leave a Review' button and fill out the form.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Homepage;
