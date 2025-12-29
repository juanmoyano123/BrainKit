"""
Claude AI Service

Handles integration with Anthropic Claude API for mnemonic generation.
"""

import json
import time
from typing import Any, Dict, List

import anthropic

from app.core.config import settings


class ClaudeService:
    """
    Claude AI Service for BrainKit

    Provides methods for generating mnemonics using Claude AI.
    """

    def __init__(self):
        """Initialize the Claude service with API client"""
        if not settings.CLAUDE_API_KEY:
            raise ValueError("CLAUDE_API_KEY is not set in environment variables")

        self.client = anthropic.Anthropic(api_key=settings.CLAUDE_API_KEY)
        self.model = "claude-sonnet-4-20250514"  # Using latest Sonnet model
        self.max_tokens = 4096
        self.timeout = 30  # 30 seconds timeout

    def _detect_language(self, text: str) -> str:
        """
        Detect the language of the input text.

        Args:
            text: Text to detect language from

        Returns:
            Language code ('es' for Spanish, 'en' for English, etc.)
        """
        # Simple heuristic-based detection for common Spanish/English words
        spanish_indicators = ['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'y', 'o', 'que', 'en', 'es', 'por', 'para', 'con', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'todo', 'esta', 'fue', 'hasta', 'muy', 'ser', 'tiene', 'están', 'qué', 'también', 'durante', 'á', 'é', 'í', 'ó', 'ú', 'ñ']
        english_indicators = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their']

        text_lower = text.lower()
        words = text_lower.split()

        spanish_count = sum(1 for word in words if word in spanish_indicators)
        english_count = sum(1 for word in words if word in english_indicators)

        # Check for Spanish-specific characters
        if any(char in text for char in ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', '¿', '¡']):
            spanish_count += 5

        # Default to Spanish if more Spanish indicators, otherwise English
        return 'es' if spanish_count > english_count else 'en'

    def _build_mnemonic_prompt(self, list_items: List[str], language: str = 'en') -> str:
        """
        Build the prompt for Claude to generate mnemonics.

        Args:
            list_items: List of items to create mnemonics for
            language: Language code ('es' for Spanish, 'en' for English)

        Returns:
            Formatted prompt string
        """
        item_count = len(list_items)
        items_formatted = "\n".join([f"{i+1}. {item}" for i, item in enumerate(list_items)])

        # Language-specific instructions
        if language == 'es':
            prompt = f"""Eres un experto en memoria especializado en técnicas mnemotécnicas para profesionales médicos.

Dada la siguiente lista de elementos para memorizar:
{items_formatted}

Genera TRES técnicas mnemotécnicas diferentes para ayudar a recordar esta lista:

1. **TÉCNICA ACRÓSTICA**
Crea una frase o oración memorable donde la primera letra de cada palabra corresponda a un elemento de la lista (en orden).
- Formato: Frase/oración única
- Incluye: La frase acróstica, luego la explicación de qué letra = qué elemento
- Longitud máxima: 100 palabras

2. **TÉCNICA DE HISTORIA NARRATIVA**
Crea una historia corta vívida y memorable que incorpore TODOS los elementos en secuencia.
- Usa detalles sensoriales y ganchos emocionales
- Hazla ligeramente inusual o humorística (profesionalmente apropiada)
- La historia debe fluir lógicamente para que recordar un elemento lleve al siguiente
- Longitud máxima: 300 palabras

3. **TÉCNICA DE PATRÓN VISUAL/ESPACIAL**
Crea un mapa mental, viaje, o técnica de patrón visual.
- Podría ser: Método de Loci (elementos colocados en ubicaciones familiares), agrupaciones visuales, o basado en patrones
- Describe qué visualizar para cada elemento
- Haz las imágenes vívidas e interactivas
- Longitud máxima: 200 palabras

Para cada técnica, incluye:
- Un título corto
- El contenido mnemotécnico
- Una breve explicación "Cómo usar esto" (1-2 oraciones)

IMPORTANTE:
- Incluye TODOS los {item_count} elementos de la lista - no omitas ninguno
- Mantén un lenguaje profesional pero memorable
- Asegúrate de que cada técnica realmente ayude a recordar la lista en orden
- TODO debe estar en ESPAÑOL

Devuelve la respuesta en formato JSON:
{{
  "acrostic": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "story": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "visual": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }}
}}"""
        else:  # English
            prompt = f"""You are a memory expert specializing in mnemonic techniques for medical professionals.

Given the following list of items to memorize:
{items_formatted}

Generate THREE different mnemonic techniques to help remember this list:

1. **ACROSTIC TECHNIQUE**
Create a memorable phrase or sentence where the first letter of each word corresponds to an item in the list (in order).
- Format: Single phrase/sentence
- Include: The acrostic phrase, then explanation of which letter = which item
- Max length: 100 words

2. **NARRATIVE STORY TECHNIQUE**
Create a vivid, memorable short story that incorporates ALL items in sequence.
- Use sensory details and emotional hooks
- Make it slightly unusual or humorous (professionally appropriate)
- The story should flow logically so recalling one item leads to the next
- Max length: 300 words

3. **VISUAL/SPATIAL PATTERN TECHNIQUE**
Create a mental map, journey, or visual pattern technique.
- Could be: Method of Loci (items placed in familiar locations), visual groupings, or pattern-based
- Describe what to visualize for each item
- Make images vivid and interactive
- Max length: 200 words

For each technique, include:
- A short title
- The mnemonic content
- A brief "How to use this" explanation (1-2 sentences)

IMPORTANT:
- Include ALL {item_count} items from the list - do not omit any
- Keep language professional but memorable
- Ensure each technique would actually help recall the list in order

Output in JSON format:
{{
  "acrostic": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "story": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "visual": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }}
}}"""

        return prompt

    async def extract_key_concepts(
        self,
        text: str,
        max_concepts: int = 30,
    ) -> List[str]:
        """
        Extract key concepts from a long text for memorization.

        Args:
            text: The text to extract concepts from
            max_concepts: Maximum number of concepts to extract (default 30)

        Returns:
            List of key concepts/facts suitable for mnemonic generation

        Raises:
            Exception: If extraction fails
        """
        # Limit text length to avoid context issues (approx 15k chars = ~4k tokens)
        max_text_length = 15000
        if len(text) > max_text_length:
            text = text[:max_text_length]

        # Detect language
        detected_language = self._detect_language(text)

        # Build language-specific prompt
        if detected_language == 'es':
            prompt = f"""Eres un educador experto analizando contenido educativo.

Analiza el siguiente texto y extrae los CONCEPTOS CLAVE, HECHOS, o ELEMENTOS que un estudiante debe memorizar.

REGLAS:
- Extrae entre 10 y {max_concepts} elementos clave
- Cada elemento debe ser un hecho, concepto, término o pieza de información discreta
- Enfócate en contenido memorizable: definiciones, listas, secuencias, términos clave, hechos importantes
- Cada elemento debe ser conciso (máximo 1-2 oraciones)
- Los elementos deben ser específicos y accionables para el aprendizaje
- Omite texto introductorio, contenido de relleno e información repetitiva
- Prioriza los conceptos más importantes
- TODO debe estar en ESPAÑOL

TEXTO PARA ANALIZAR:
---
{text}
---

Devuelve tu respuesta como un objeto JSON con este formato:
{{
  "concepts": [
    "Primer concepto o hecho clave",
    "Segundo concepto o hecho clave",
    ...
  ]
}}

IMPORTANTE: Solo devuelve el objeto JSON, sin texto adicional."""
        else:  # English
            prompt = f"""You are an expert educator analyzing educational content.

Analyze the following text and extract the KEY CONCEPTS, FACTS, or ITEMS that a student should memorize.

RULES:
- Extract between 10 and {max_concepts} key items
- Each item should be a discrete fact, concept, term, or piece of information
- Focus on memorizable content: definitions, lists, sequences, key terms, important facts
- Each item should be concise (1-2 sentences max)
- Items should be specific and actionable for learning
- Skip introductory text, filler content, and repetitive information
- Prioritize the most important concepts

TEXT TO ANALYZE:
---
{text}
---

Return your response as a JSON object with this format:
{{
  "concepts": [
    "First key concept or fact",
    "Second key concept or fact",
    ...
  ]
}}

IMPORTANT: Only return the JSON object, no additional text."""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                temperature=0.3,  # Lower temperature for more consistent extraction
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                timeout=self.timeout,
            )

            response_text = message.content[0].text

            # Parse JSON response
            try:
                # Handle markdown code blocks
                if "```json" in response_text:
                    json_start = response_text.find("```json") + 7
                    json_end = response_text.find("```", json_start)
                    response_text = response_text[json_start:json_end].strip()
                elif "```" in response_text:
                    json_start = response_text.find("```") + 3
                    json_end = response_text.find("```", json_start)
                    response_text = response_text[json_start:json_end].strip()

                result = json.loads(response_text)
                concepts = result.get("concepts", [])

                if not concepts:
                    raise Exception("No concepts were extracted from the text")

                # Clean and validate concepts
                cleaned_concepts = []
                for concept in concepts:
                    if isinstance(concept, str) and concept.strip():
                        cleaned_concepts.append(concept.strip())

                return cleaned_concepts

            except json.JSONDecodeError as e:
                raise Exception(f"Failed to parse Claude response: {str(e)}")

        except anthropic.APITimeoutError:
            raise Exception("Processing is taking longer than expected. Please try again.")

        except anthropic.RateLimitError:
            raise Exception("Too many requests. Please wait a moment and try again.")

        except anthropic.APIError as e:
            raise Exception(f"Failed to analyze text: {str(e)}")

    async def generate_mnemonics(
        self,
        list_items: List[str],
        user_id: str,
        deck_id: str = None,
    ) -> Dict[str, Any]:
        """
        Generate three mnemonic techniques for a list of items.

        Args:
            list_items: List of items to create mnemonics for
            user_id: User ID for logging
            deck_id: Optional deck ID for tracking

        Returns:
            Dict containing:
                - acrostic: Dict with title, content, how_to_use
                - story: Dict with title, content, how_to_use
                - visual: Dict with title, content, how_to_use
                - metadata: Dict with generation_time_ms, item_count, model

        Raises:
            ValueError: If list_items is invalid
            anthropic.APIError: If Claude API fails
            Exception: For other errors
        """
        # Validate input
        if not list_items or len(list_items) < 3:
            raise ValueError("List must contain at least 3 items")

        if len(list_items) > 50:
            raise ValueError("List cannot contain more than 50 items")

        # Detect language from the list items
        combined_text = " ".join(list_items)
        detected_language = self._detect_language(combined_text)

        # Build prompt with detected language
        prompt = self._build_mnemonic_prompt(list_items, language=detected_language)

        # Track generation time
        start_time = time.time()

        try:
            # Call Claude API
            message = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                temperature=1.0,  # Higher temperature for more creative mnemonics
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                timeout=self.timeout,
            )

            # Calculate generation time
            generation_time_ms = int((time.time() - start_time) * 1000)

            # Extract response content
            response_text = message.content[0].text

            # Parse JSON response
            try:
                # Try to find JSON in the response
                # Claude might wrap it in markdown code blocks
                if "```json" in response_text:
                    json_start = response_text.find("```json") + 7
                    json_end = response_text.find("```", json_start)
                    response_text = response_text[json_start:json_end].strip()
                elif "```" in response_text:
                    json_start = response_text.find("```") + 3
                    json_end = response_text.find("```", json_start)
                    response_text = response_text[json_start:json_end].strip()

                mnemonics = json.loads(response_text)
            except json.JSONDecodeError as e:
                raise Exception(f"Failed to parse Claude response as JSON: {str(e)}")

            # Validate response structure
            required_keys = ["acrostic", "story", "visual"]
            for key in required_keys:
                if key not in mnemonics:
                    raise Exception(f"Missing '{key}' in Claude response")

                technique = mnemonics[key]
                if not isinstance(technique, dict):
                    raise Exception(f"'{key}' must be a dictionary")

                required_fields = ["title", "content", "how_to_use"]
                for field in required_fields:
                    if field not in technique:
                        raise Exception(f"Missing '{field}' in '{key}' technique")

            # Add metadata
            result = {
                "acrostic": mnemonics["acrostic"],
                "story": mnemonics["story"],
                "visual": mnemonics["visual"],
                "metadata": {
                    "generation_time_ms": generation_time_ms,
                    "item_count": len(list_items),
                    "model": self.model,
                    "user_id": user_id,
                    "deck_id": deck_id,
                }
            }

            return result

        except anthropic.APITimeoutError:
            raise Exception("Generation is taking longer than expected. Please try again.")

        except anthropic.RateLimitError:
            raise Exception("Too many requests. Please wait a moment and try again.")

        except anthropic.APIError as e:
            raise Exception(f"We couldn't generate mnemonics right now. Please try again in a moment. Error: {str(e)}")

        except Exception as e:
            # Re-raise validation errors and parsing errors
            if "Missing" in str(e) or "parse" in str(e).lower():
                raise
            raise Exception(f"Failed to generate mnemonics: {str(e)}")


# Singleton instance
claude_service = ClaudeService()
