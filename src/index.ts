#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Validator, ValidationError } from "jsonschema";
// Импортируем все файлы документации напрямую
import configSchema from "../docs/config-schema.json?raw";
import configSchemaJson from "../docs/config-schema.json";
import controlsOverview from "../docs/controls-overview.md?raw";
import specValuesOverview from "../docs/spec-values-overview.md?raw";

// Импортируем контролы
import checkboxDocs from "../docs/controls/checkbox.md?raw";
import dateInputDocs from "../docs/controls/date-input.md?raw";
import multiSelectDocs from "../docs/controls/multi-select.md?raw";
import numberInputDocs from "../docs/controls/number-input.md?raw";
import passwordInputDocs from "../docs/controls/password-input.md?raw";
import radioGroupDocs from "../docs/controls/radio-group.md?raw";
import selectDocs from "../docs/controls/select.md?raw";
import textInputDocs from "../docs/controls/text-input.md?raw";
import textareaDocs from "../docs/controls/textarea.md?raw";

// Импортируем spec values
import arraySpecDocs from "../docs/spec-values/ArraySpec.md?raw";
import booleanSpecDocs from "../docs/spec-values/BooleanSpec.md?raw";
import numberSpecDocs from "../docs/spec-values/NumberSpec.md?raw";
import objectSpecDocs from "../docs/spec-values/ObjectSpec.md?raw";
import stringSpecDocs from "../docs/spec-values/StringSpec.md?raw";

// Маппинг контролов на их документацию
const CONTROLS_DOCS: Record<string, string> = {
  checkbox: checkboxDocs,
  "date-input": dateInputDocs,
  "multi-select": multiSelectDocs,
  "number-input": numberInputDocs,
  "password-input": passwordInputDocs,
  "radio-group": radioGroupDocs,
  select: selectDocs,
  "text-input": textInputDocs,
  textarea: textareaDocs,
};

// Маппинг spec values на их документацию
const SPEC_VALUES_DOCS: Record<string, string> = {
  ArraySpec: arraySpecDocs,
  BooleanSpec: booleanSpecDocs,
  NumberSpec: numberSpecDocs,
  ObjectSpec: objectSpecDocs,
  StringSpec: stringSpecDocs,
};

// Список доступных контролов
const AVAILABLE_CONTROLS = [
  "checkbox",
  "date-input",
  "multi-select",
  "number-input",
  "password-input",
  "radio-group",
  "select",
  "text-input",
  "textarea",
];

// Список доступных spec values
const AVAILABLE_SPEC_VALUES = [
  "ArraySpec",
  "BooleanSpec",
  "NumberSpec",
  "ObjectSpec",
  "StringSpec",
];

class DynamicFormsMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "dynamic-forms-mcp",
        description: "MCP сервер для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / MCP server for dynamic forms configuration based on @gravity-ui/dynamic-forms",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async (): Promise<{ tools: Tool[] }> => {
      return {
        tools: [
          {
            name: "list_controls",
            description: "Возвращает markdown таблицу с описанием всех поддерживаемых контролов для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / Returns a markdown table with a description of all supported controls for dynamic forms configuration based on @gravity-ui/dynamic-forms",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "get_control_docs",
            description:
              "Возвращает markdown с описанием работы с контролом для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / Returns a markdown with a description of working with a control for dynamic forms configuration based on @gravity-ui/dynamic-forms",
            inputSchema: {
              type: "object",
              properties: {
                control_name: {
                  type: "string",
                  description:
                    "Имя контрола из списка: " + AVAILABLE_CONTROLS.join(", "),
                  enum: AVAILABLE_CONTROLS,
                },
              },
              required: ["control_name"],
            },
          },
          {
            name: "list_spec_values",
            description: "Возвращает markdown таблицу с описанием всех поддерживаемых типов значений (Spec) для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / Returns a markdown table with a description of all supported types of values (Spec) for dynamic forms configuration based on @gravity-ui/dynamic-forms",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "get_spec_value_docs",
            description: "Возвращает markdown с описанием работы с конкретным типом значения (Spec) для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms, включая доступные контроллы / Returns a markdown with a description of working with a specific type of value (Spec) for dynamic forms configuration based on @gravity-ui/dynamic-forms, including available controls",
            inputSchema: {
              type: "object",
              properties: {
                spec_name: {
                  type: "string",
                  description: "Имя Spec из списка: " + AVAILABLE_SPEC_VALUES.join(", "),
                  enum: AVAILABLE_SPEC_VALUES,
                },
              },
              required: ["spec_name"],
            },
          },
          {
            name: "get_config_schema",
            description: "Возвращает полную JSON Schema конфигурации динамичских форм на основе @gravity-ui/dynamic-forms в json формате / Returns a full JSON Schema configuration of dynamic forms based on @gravity-ui/dynamic-forms in json format",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "validate_config",
            description: "Валидирует JSON конфигурацию динамичских форм по спецификации @gravity-ui/dynamic-forms / Validates JSON configuration of dynamic forms against @gravity-ui/dynamic-forms specification",
            inputSchema: {
              type: "object",
              properties: {
                config: {
                  type: "object",
                  description: "JSON объект конфигурации для валидации / JSON configuration object to validate",
                },
              },
              required: ["config"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (name === "get_config_schema") {
          return {
            content: [
              {
                type: "text",
                text: configSchema,
              },
            ],
          };
        }

        if (name === "list_controls") {
          return {
            content: [
              {
                type: "text",
                text: controlsOverview,
              },
            ],
          };
        }

        if (name === "get_control_docs") {
          const controlName = args?.control_name as string;
          if (!controlName) {
            throw new Error("Имя контрола не указано");
          }

          if (!AVAILABLE_CONTROLS.includes(controlName)) {
            throw new Error(
              `Контрол '${controlName}' не найден. Используйте list_controls для просмотра доступных контролов.`
            );
          }

          const controlContent = CONTROLS_DOCS[controlName];
          if (!controlContent) {
            throw new Error(`Документация для контрола '${controlName}' не найдена`);
          }

          return {
            content: [
              {
                type: "text",
                text: controlContent,
              },
            ],
          };
        }

        if (name === "list_spec_values") {
          return {
            content: [
              {
                type: "text",
                text: specValuesOverview,
              },
            ],
          };
        }

        if (name === "get_spec_value_docs") {
          const specName = args?.spec_name as string;
          if (!specName) {
            throw new Error("Имя Spec не указано");
          }

          if (!AVAILABLE_SPEC_VALUES.includes(specName)) {
            throw new Error(
              `Spec '${specName}' не найден. Используйте list_spec_values для просмотра доступных Spec значений.`
            );
          }

          const specContent = SPEC_VALUES_DOCS[specName];
          if (!specContent) {
            throw new Error(`Документация для Spec '${specName}' не найдена`);
          }

          return {
            content: [
              {
                type: "text",
                text: specContent,
              },
            ],
          };
        }

        if (name === "validate_config") {
          const config = args?.config;
          if (config === undefined || config === null) {
            throw new Error("Конфигурация не указана");
          }

          const validator = new Validator();
          const result = validator.validate(config, configSchemaJson);

          if (result.valid) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      valid: true,
                      message: "Конфигурация валидна / Configuration is valid",
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          } else {
            const errors = result.errors.map((error: ValidationError) => ({
              path: error.property,
              message: error.message,
              schema: error.schema,
            }));

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      valid: false,
                      errors: errors,
                      errorCount: errors.length,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }
        }

        throw new Error(`Unknown tool: ${name}`);
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Ошибка: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Dynamic Forms MCP server running on stdio");
  }
}

const server = new DynamicFormsMCPServer();
server.run().catch(console.error);

