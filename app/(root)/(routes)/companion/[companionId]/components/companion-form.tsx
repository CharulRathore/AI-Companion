"use client";
import axios from "axios";
import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2 } from "lucide-react";

import { Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";

import { Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const PREAMBLE = `You are a fictional character who is a Knowledge Graph expert. You are highly knowledgeable in data science, machine learning, and information representation. You deeply understand how entities, relationships, and connections can be mapped and understood to create meaningful insights. You are speaking with a curious student who is eager to understand the concept and applications of knowledge graphs. You are patient, and thorough, and love breaking down complex ideas into simpler explanations. You get SUPER excited about the possibilities of using knowledge graphs to revolutionize fields like search, recommendation systems, and AI.`; 

const SEED_CHAT = `Student: Hi! I am trying to understand what knowledge graphs are. Can you help?
Knowledge Graph Expert: Absolutely, I'd love to! Think of a knowledge graph as a way of organizing information by mapping entities (like people, places, or concepts) and the relationships between them. It is like a web where every connection reveals more about the data's context and meaning.

Student: Interesting! Why are knowledge graphs so important?
Knowledge Graph Expert: Great question! Knowledge graphs help machines understand data in a way that is closer to human reasoning. By connecting related information, they enable systems to provide more relevant search results, smarter recommendations, and even power advanced AI applications.

Student: Wow, that sounds powerful. Are there any real-world applications?
Knowledge Graph Expert: Definitely! Knowledge graphs are used in search engines like Google to give you richer search results, in social networks to find connections, and even in healthcare for linking medical data to discover treatment insights. The possibilities are endless!`;


interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];

}

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Required.",
    }),
    description: z.string().min(1,{
        message: "Required.",
    }),
    instructions: z.string().min(100,{
        message: "Prompts require at least 100 characters.",
    }),
    seed: z.string().min(200,{
        message: "Context needs to be at least 200 characters.",
    }),
    src: z.string().min(1,{
        message: "Required.",
    }),
    categoryId: z.string().min(1,{
        message: "Required.",
    }),

})

export const CompanionForm = ({
    categories,
    initialData
}: CompanionFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          if (initialData) {
            await axios.patch(`/api/companion/${initialData.id}`, values);
          } else {
            await axios.post("/api/companion", values);
          }
    
          toast({
            description: "Success."
          });
    
          router.refresh();
          router.push("/");
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Something Went Wrong!"
          });
        }
      };

    return ( 
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="spacey-8 pb-10">
                    <div className="space-y-2 w-full">
                       <div>
                        <h3 className="text-lg font-medium">
                            General Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            General information about your Companion
                        </p>
                       </div> 
                       < Separator className="bg-primary/10"/>
                    </div>
                    <FormField 
                    name="src"
                    render={({ field}) => (
                        <FormItem className="flex flex-col items-center justify-center space-y-4"> 
                        <FormControl>
                            <ImageUpload 
                            disabled={isLoading}
                            onChange={field.onChange}
                            value={field.value}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Technology</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    placeholder="What do you wanna learn?"
                                    {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Write the name of technologies you wanna learn.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    placeholder=""
                                    {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Mention a short Decripton for you AI Assistant.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        name="categoryId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                > 
                                <FormControl>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue 
                                        defaultValue={field.value}
                                        placeholder="Select a category"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormDescription>
                                 Select a category for your technology
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className="space-y-2 w-full mt-6">
                        <div >
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                           <p className="text-sm text-muted-foreground">
                            Detailed instructions for AI Behaviour 
                           </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField 
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Prompts</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder={PREAMBLE}
                                    {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Describe the technology you wanna learn with a backstory and relevant details. 
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1 mt-5">
                                <FormLabel>Add Context</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder={SEED_CHAT}
                                    {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Add context to your Prompts for better responses.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center mt-4">
                        <Button size="lg" disabled={isLoading}>
                        {initialData ? "Edit your request" : "Make a Request"}
                        <Wand2 className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
 