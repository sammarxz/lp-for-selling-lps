import { ArrowDownIcon } from "@/components/ui/arrow-down-icon";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/ui/social-proof";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const { author, description } = SITE_CONFIG;

  return (
    <header className="max-w-xl mx-auto px-6 space-y-12">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <Avatar
          src={author.image}
          alt={`Foto pessoal de ${author.name}`}
          size="md"
        />
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">{author.name}</div>
          <div className="text-xs text-gray-500">{author.role}</div>
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900">
          Sua landing page pronta em 24 horas
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {description}. Criamos landing pages de alta performance em menos de
          um dia.
        </p>
      </div>

      {/* CTA & Badge */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <Button
          href="#chat"
          size="lg"
          className="group relative overflow-hidden"
          trackingEvent="lead"
          trackingData={{ source: "hero_cta", position: "main" }}
        >
          <span className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
            Quero minha Landing Page
          </span>
          <span className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowDownIcon className="h-6 w-6" />
          </span>
        </Button>

        <Badge className="inline-flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Últimas 3 vagas desta semana
        </Badge>
      </div>

      {/* Social Proof */}
      <SocialProof />
    </header>
  );
}
