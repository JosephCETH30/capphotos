"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CAMERA_BRANDS, CUSTOM_MODEL_ID, formatCameraSpec } from "@/data/cameras";

export interface CameraSelection {
  brandId: string;
  modelId: string;
  /** Free-typed model name — only set when modelId === CUSTOM_MODEL_ID. */
  customModelName?: string;
}

interface CameraPickerProps {
  value: CameraSelection | null;
  onChange: (value: CameraSelection) => void;
}

export function CameraPicker({ value, onChange }: CameraPickerProps) {
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [enteringCustomModel, setEnteringCustomModel] = useState(false);
  const [customDraft, setCustomDraft] = useState("");

  const selectedBrand = value ? (CAMERA_BRANDS.find((b) => b.id === value.brandId) ?? null) : null;
  const isCustomModel = value?.modelId === CUSTOM_MODEL_ID;
  const selectedModel = !isCustomModel
    ? (selectedBrand?.models.find((m) => m.id === value?.modelId) ?? null)
    : null;

  const modelLabel = isCustomModel
    ? (value?.customModelName?.trim() || "Custom model")
    : (selectedModel?.name ?? (selectedBrand ? "Select a model" : "Pick a brand first"));

  function handleBrandSelect(brandId: string) {
    setBrandOpen(false);
    if (brandId === value?.brandId) return;
    // Picking a different brand clears any model chosen for the previous one.
    onChange({ brandId, modelId: "" });
    setEnteringCustomModel(false);
    setModelOpen(true);
  }

  function handleModelSelect(modelId: string) {
    if (!value) return;
    onChange({ brandId: value.brandId, modelId });
    setModelOpen(false);
  }

  function startCustomModel() {
    setCustomDraft(value?.customModelName ?? "");
    setEnteringCustomModel(true);
  }

  function confirmCustomModel() {
    if (!value || !customDraft.trim()) return;
    onChange({ brandId: value.brandId, modelId: CUSTOM_MODEL_ID, customModelName: customDraft.trim() });
    setEnteringCustomModel(false);
    setModelOpen(false);
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">
      <div className="grid min-w-0 gap-1.5">
        <Label id="camera-brand-label">Camera brand</Label>
        <Popover open={brandOpen} onOpenChange={setBrandOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={brandOpen}
                aria-labelledby="camera-brand-label"
                className="w-full min-w-0 justify-between font-normal"
              />
            }
          >
            <span className={cn("truncate", !selectedBrand && "text-muted-foreground")}>
              {selectedBrand?.name ?? "Type or select a brand"}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-72 max-w-[90vw] p-0" align="start">
            <Command>
              <CommandInput placeholder="e.g. Sony, Canon, Leica…" />
              <CommandList className="max-h-72">
                <CommandEmpty>No registered brand matches that.</CommandEmpty>
                {CAMERA_BRANDS.map((brand) => (
                  <CommandItem
                    key={brand.id}
                    value={brand.name}
                    data-checked={value?.brandId === brand.id}
                    onSelect={() => handleBrandSelect(brand.id)}
                  >
                    {brand.name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid min-w-0 gap-1.5">
        <Label id="camera-model-label">Model</Label>
        <Popover
          open={modelOpen}
          onOpenChange={(open) => {
            setModelOpen(open);
            if (!open) setEnteringCustomModel(false);
          }}
        >
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={modelOpen}
                aria-labelledby="camera-model-label"
                disabled={!selectedBrand}
                className="w-full min-w-0 justify-between font-normal"
              />
            }
          >
            <span
              className={cn("truncate", !selectedModel && !isCustomModel && "text-muted-foreground")}
            >
              {modelLabel}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-72 max-w-[90vw] p-0" align="start">
            {enteringCustomModel ? (
              <div className="flex flex-col gap-2 p-3">
                <p className="text-xs text-muted-foreground">
                  Not in the list? Type just the model name — {selectedBrand?.name} is already
                  selected.
                </p>
                <Input
                  autoFocus
                  placeholder={
                    selectedBrand?.models[0] ? `e.g. ${selectedBrand.models[0].name}` : "Model name"
                  }
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirmCustomModel();
                    }
                  }}
                />
                <div className="flex justify-between gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEnteringCustomModel(false)}
                  >
                    Back to list
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={!customDraft.trim()}
                    onClick={confirmCustomModel}
                  >
                    Use this model
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Command>
                  <CommandInput placeholder="Search model…" />
                  <CommandList className="max-h-60">
                    <CommandEmpty>No model found.</CommandEmpty>
                    {selectedBrand?.models.map((model) => (
                      <CommandItem
                        key={model.id}
                        value={`${model.name} ${model.sensorSize}`}
                        data-checked={value?.modelId === model.id}
                        onSelect={() => handleModelSelect(model.id)}
                      >
                        <span className="flex-1 truncate">{model.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatCameraSpec(model)}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
                {/* Always-visible fallback, outside the searchable list so it's never filtered away. */}
                <div className="border-t p-1">
                  <button
                    type="button"
                    onClick={startCustomModel}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                      isCustomModel && "text-foreground"
                    )}
                  >
                    <Plus className="size-4 shrink-0" />
                    <span className="flex-1 truncate text-left">
                      {isCustomModel ? `Custom: ${value?.customModelName}` : "My camera isn't listed"}
                    </span>
                    {isCustomModel && <Check className="size-4 shrink-0" />}
                  </button>
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
