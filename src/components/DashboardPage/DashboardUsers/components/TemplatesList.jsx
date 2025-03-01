import { useEffect, useState } from "react";
import { TitleHeader } from "../../components/TitleHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const TemplatesList = ({ templates, sendTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const handleTemplateSelection = (templateName) => {
    setSelectedTemplate(templateName);
    sendTemplate(templateName);
  };

  const toggleTemplate = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
      <div className="space-y-6 bg-slate-900 h-[94%]">
        <div className="h-full">
          <Card className="col-span-1 bg-slate-800/50 border-slate-700 h-full flex flex-col">
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <h3 className="text-lg font-medium text-white">
                  Lista de Plantillas
                </h3>
              </div>

              <RadioGroup
                value={selectedTemplate}
                onValueChange={handleTemplateSelection}
                className="space-y-4 overflow-y-auto flex-grow scrollbar-custom pr-2"
              >
              {templates.map((template) => (
                <div
                  key={template.name}
                  className="relative flex flex-col p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem
                      value={template.name}
                      id={template.id}
                      className="mt-1 border-slate-500"
                    />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={template.id}
                        className="text-base font-semibold text-slate-200 block mb-1 cursor-pointer hover:text-slate-100"
                      >
                        {template.name}
                      </Label>
                      <div className="relative">
                        <p
                          className={`text-sm text-slate-400 mb-2 transition-all duration-500 ease-in-out overflow-hidden ${expandedId === template.id
                            ? "max-h-[500px]"
                            : "max-h-[43px]"
                            }`}
                        >
                          {template.descripcion}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTemplate(template.id)}
                          className="text-cyan-500 hover:text-cyan-400 p-0 h-auto font-normal hover:bg-transparent"
                        >
                          <ChevronDown
                            className={`w-4 h-4 mr-1 transition-transform duration-200 ${expandedId === template.id
                              ? "transform rotate-180"
                              : ""
                              }`}
                          />
                          {expandedId === template.id
                            ? "Ver menos"
                            : "Ver más"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesList;
