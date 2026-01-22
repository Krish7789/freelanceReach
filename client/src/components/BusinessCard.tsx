import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

/* ----------------------------- TYPES ----------------------------- */
interface BusinessCardBusiness {
  id: string;
  name: string;
  category: string;
  location: {
    city: string;
    country: string;
  };
  email: string;
  description: string;
  website: string;
  contactMethod?: string;
  contactValue?: string;
}

interface BusinessCardProps {
  business: BusinessCardBusiness;
  isSelected: boolean;
  onSelect: () => void;
}

/* ---------------------------- COMPONENT ---------------------------- */
const BusinessCard = ({
  business,
  isSelected,
  onSelect,
}: BusinessCardProps) => {
  /* ------------------------- ACTION HANDLER ------------------------- */
  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    switch (business.contactMethod) {
      case "email":
        window.location.href = `mailto:${business.contactValue}`;
        break;

      case "contact-form":
      case "website":
        window.open(business.contactValue || business.website, "_blank");
        break;

      case "phone":
        window.location.href = `tel:${business.contactValue}`;
        break;

      default:
        if (business.website) {
          window.open(business.website, "_blank");
        }
    }
  };

  /* ------------------------- BUTTON LABEL ------------------------- */
  const getActionLabel = () => {
    switch (business.contactMethod) {
      case "email":
        return "Send Email";
      case "contact-form":
        return "Open Contact Page";
      case "phone":
        return "Call";
      case "website":
        return "Visit Website";
      default:
        return "Open";
    }
  };

  const getActionIcon = () => {
    switch (business.contactMethod) {
      case "email":
        return <Mail className="h-4 w-4 mr-2" />;
      case "phone":
        return <Phone className="h-4 w-4 mr-2" />;
      default:
        return <ExternalLink className="h-4 w-4 mr-2" />;
    }
  };

  /* ------------------------------ UI ------------------------------ */
  return (
    <Card
      className={`card-interactive cursor-pointer transition ${
        isSelected ? "border-accent ring-1 ring-accent" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="pt-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold truncate">{business.name}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {business.location.city}, {business.location.country}
                  </span>
                </div>
              </div>
              <Badge variant="secondary">{business.category}</Badge>
            </div>

            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {business.description}
            </p>

            {/* Website */}
            {business.website && (
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                <span className="truncate">
                  {business.website.replace(/^https?:\/\//, "")}
                </span>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAction}
              >
                {getActionIcon()}
                {getActionLabel()}
              </Button>
              {business.contactMethod !== "email" && (
  <p className="mt-2 text-xs text-muted-foreground">
    Email not found — using best available contact method.
  </p>
)}

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
