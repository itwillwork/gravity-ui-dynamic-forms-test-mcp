#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DOCS_DIR = join(__dirname, "../docs");
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
    server;
    constructor() {
        this.server = new Server({
            name: "dynamic-forms-mcp",
            description: "MCP сервер для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / MCP server for dynamic forms configuration based on @gravity-ui/dynamic-forms",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupToolHandlers();
        this.setupErrorHandling();
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
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
                        description: "Возвращает markdown с описанием работы с контролом для конфигурации динамичских форм на основе @gravity-ui/dynamic-forms / Returns a markdown with a description of working with a control for dynamic forms configuration based on @gravity-ui/dynamic-forms",
                        inputSchema: {
                            type: "object",
                            properties: {
                                control_name: {
                                    type: "string",
                                    description: "Имя контрола из списка: " + AVAILABLE_CONTROLS.join(", "),
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
                ],
            };
        });
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                if (name === "get_config_schema") {
                    const schemaPath = join(DOCS_DIR, "config-schema.json");
                    const schemaContent = readFileSync(schemaPath, "utf-8");
                    return {
                        content: [
                            {
                                type: "text",
                                text: schemaContent,
                            },
                        ],
                    };
                }
                if (name === "list_controls") {
                    const controlsPath = join(DOCS_DIR, "controls-overview.md");
                    const controlsContent = readFileSync(controlsPath, "utf-8");
                    return {
                        content: [
                            {
                                type: "text",
                                text: controlsContent,
                            },
                        ],
                    };
                }
                if (name === "get_control_docs") {
                    const controlName = args?.control_name;
                    if (!controlName) {
                        throw new Error("Имя контрола не указано");
                    }
                    if (!AVAILABLE_CONTROLS.includes(controlName)) {
                        throw new Error(`Контрол '${controlName}' не найден. Используйте list_controls для просмотра доступных контролов.`);
                    }
                    const controlPath = join(DOCS_DIR, "controls", `${controlName}.md`);
                    const controlContent = readFileSync(controlPath, "utf-8");
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
                    const specValuesPath = join(DOCS_DIR, "spec-values-overview.md");
                    const specValuesContent = readFileSync(specValuesPath, "utf-8");
                    return {
                        content: [
                            {
                                type: "text",
                                text: specValuesContent,
                            },
                        ],
                    };
                }
                if (name === "get_spec_value_docs") {
                    const specName = args?.spec_name;
                    if (!specName) {
                        throw new Error("Имя Spec не указано");
                    }
                    if (!AVAILABLE_SPEC_VALUES.includes(specName)) {
                        throw new Error(`Spec '${specName}' не найден. Используйте list_spec_values для просмотра доступных Spec значений.`);
                    }
                    const specPath = join(DOCS_DIR, "spec-values", `${specName}.md`);
                    const specContent = readFileSync(specPath, "utf-8");
                    return {
                        content: [
                            {
                                type: "text",
                                text: specContent,
                            },
                        ],
                    };
                }
                throw new Error(`Unknown tool: ${name}`);
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Ошибка: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    setupErrorHandling() {
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
//# sourceMappingURL=index.js.map