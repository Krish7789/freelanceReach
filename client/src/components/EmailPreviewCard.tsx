import { Business } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail } from "lucide-react";

interface EmailPreviewCardProps {
  business: Business;
}

const EmailPreviewCard = ({ business }: EmailPreviewCardProps) => {
  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-medium text-foreground truncate">{business.name}</h4>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{business.location.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
            <Mail className="h-3 w-3" />
            <span className="truncate max-w-[180px]">{business.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreviewCard;
