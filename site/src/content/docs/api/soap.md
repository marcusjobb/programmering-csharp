---
title: SOAP
description: "SOAP i APIer — C#-boken av Marcus Ackre Medina"
layout: default
parent: APIer
nav_order: 3
---
# SOAP

SOAP (Simple Object Access Protocol) är ett äldre, XML-baserat protokoll för att anropa API:er — vanligt i företagsvärlden och starkt förknippat med Microsofts ekosystem (ASP.NET Web Services/ASMX, WCF). Där [REST](rest.md) och [GraphQL](graphql.md) skickar lättviktig JSON, skickar SOAP alltid XML enligt ett strikt, formellt schema.

## När du läst detta ska du kunna

- Förklara vad som skiljer SOAP från REST
- Känna igen ett SOAP-anrop och ett WSDL-kontrakt
- Veta när du fortfarande stöter på SOAP idag

## Allt är XML, allt är formellt

Ett SOAP-anrop skickas alltid som ett XML-"kuvert" (envelope), oavsett vad anropet faktiskt gäller:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header></soap:Header>
  <soap:Body>
    <GetStudent xmlns="http://example.com/students">
      <Id>42</Id>
    </GetStudent>
  </soap:Body>
</soap:Envelope>
```

Jämför det med REST, där samma anrop bara vore `GET /api/students/42` — SOAP kräver betydligt mer skrivning, men får i gengäld en mycket strikt, formellt definierad struktur.

## WSDL — kontraktet som beskriver API:et

Varje SOAP-tjänst har ett **WSDL**-dokument (Web Services Description Language) som i XML-form beskriver exakt vilka metoder tjänsten erbjuder, vilka parametrar de tar, och vilka datatyper som förväntas — maskinläsbart nog för att verktyg automatiskt ska kunna generera klientkod utifrån det. Det är lite som en mycket strängare kusin till OpenAPI/Swagger (se [Scalar och OpenAPI](scalar.md)), fast obligatorisk snarare än valfri.

## Varför SOAP fortfarande dyker upp

De flesta nya API:er byggs idag som REST eller GraphQL — SOAP:s strikta XML-format och tunga tooling känns omständligt jämfört med ett enkelt JSON-anrop. Men SOAP lever kvar, särskilt i:

- **Äldre företagssystem** — bank, försäkring, myndigheter, ERP-system som byggdes för 10–20 år sedan och aldrig migrerats
- **Integrationer som kräver formella garantier** — WS-Security och transaktionsstöd inbyggt i protokollet, vilket vissa regelstyrda branscher (finans, sjukvård) fortfarande kräver
- **.NET-arv** — äldre ASP.NET-projekt med ASMX- eller WCF-tjänster som fortfarande är i drift

Stöter du på ett `.asmx`- eller `.wsdl`-baserat API i ett företag, är det troligen ett SOAP-API du behöver prata med — även om allt nytt ni själva bygger är REST.

## SOAP vs REST

| | SOAP | REST |
|--|------|------|
| Format | Alltid XML | Oftast JSON, valfritt egentligen |
| Kontrakt | WSDL, obligatoriskt och strikt | OpenAPI/Swagger, valfritt |
| Endpoints | Ofta en enda endpoint, metod i XML-kroppen | Många endpoints, ett per resurs |
| Vikt | Tungt, mycket "boilerplate"-XML | Lättviktigt |
| Vanligt idag | Legacy, reglerade branscher | De flesta nya API:er |

## TL;DR

SOAP är ett strikt, XML-baserat protokoll med ett formellt WSDL-kontrakt — tyngre än REST, men med starkare garantier. Det är sällan förstahandsvalet för nya API:er idag, men dyker fortfarande upp i äldre företagssystem och .NET-arv du kan behöva integrera mot.
