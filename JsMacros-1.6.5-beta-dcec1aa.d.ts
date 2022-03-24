declare const event: Events.BaseEvent;
declare const file: Java.java.io.File;
declare const context: Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;

declare namespace Events {
    export interface BaseEvent extends Java.Object {
        getEventName(): string;
    }    
    
    export interface ProfileLoad extends BaseEvent {
        readonly profileName: string;
        
    
        toString(): string;
        
    }    
    
    export interface Custom extends BaseEvent {
        eventName: string;
        
    
        
        /**
         * Triggers the event.
         *  Try not to cause infinite looping by triggering the same {@link Java.EventCustom} from its own listeners.
         * @since 1.2.8
         */
        trigger(): void;
        
        /**
         * trigger the event listeners, then run `callback` when they finish.
         * @since 1.3.1
         * @param callback used as a {@link Runnable}, so no args, no return value.
         */
        trigger(callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>): void;
        
        /**
         * Triggers the event and waits for it to complete.
         *  In languages with threading issues (js/jep) this may cause circular waiting when triggered from the same thread as
         *  the `jsmacros.on` registration for the event
         * @since 1.2.8
         */
        triggerJoin(): void;
        
        /**
         * Put an Integer into the event.
         * @param name
         * @param i
         * @return 
         * @since 1.2.8
         */
        putInt(name: string, i: number): number;
        
        /**
         * put a String into the event.
         * @param name
         * @param str
         * @return 
         * @since 1.2.8
         */
        putString(name: string, str: string): string;
        
        /**
         * put a Double into the event.
         * @param name
         * @param d
         * @return 
         * @since 1.2.8
         */
        putDouble(name: string, d: number): number;
        
        /**
         * put a Boolean into the event.
         * @param name
         * @param b
         * @return 
         * @since 1.2.8
         */
        putBoolean(name: string, b: boolean): boolean;
        
        /**
         * put anything else into the event.
         * @param name
         * @param o
         * @return 
         * @since 1.2.8
         */
        putObject(name: string, o: Java.Object): Java.Object;
        
        /**
         * Returns the type of the defined item in the event as a string.
         * @param name
         * @return 
         * @since 1.2.8
         */
        getType(name: string): string;
        
        /**
         * Gets an Integer from the event.
         * @param name
         * @return 
         * @since 1.2.8
         */
        getInt(name: string): number;
        
        /**
         * Gets a String from the event
         * @param name
         * @return 
         * @since 1.2.8
         */
        getString(name: string): string;
        
        /**
         * Gets a Double from the event.
         * @param name
         * @return 
         * @since 1.2.8
         */
        getDouble(name: string): number;
        
        /**
         * Gets a Boolean from the event.
         * @param name
         * @return 
         * @since 1.2.8
         */
        getBoolean(name: string): boolean;
        
        /**
         * Gets an Object from the event.
         * @param name
         * @return 
         * @since 1.2.8
         */
        getObject(name: string): Java.Object;
        
        /**
         * 
         * @since 1.6.4
         * @return map backing the event
         */
        getUnderlyingMap(): Java.java.util.Map<string, Java.Object>;
        
        /**
         * registers event so you can see it in the gui
         * @since 1.3.0
         */
        registerEvent(): void;
        
    }    
    
    export interface Service extends BaseEvent {
        readonly serviceName: string;
        
        /**
         * when this service is stopped, this is run...
         */
        stopListener: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>;
        
    
        
    }    
    
    export interface CodeRender extends BaseEvent {
        readonly cursor: Java.xyz.wagyourtail.jsmacros.client.gui.editor.SelectCursor;
        readonly code: string;
        readonly language: string;
        readonly screen: Java.xyz.wagyourtail.jsmacros.client.gui.screens.EditorScreen;
        
        /**
         * you are expected to fill this in with text styling, if not filled, nothing will render
         *  if the code is an empty string, you are still expected to put an empty string as the first line here
         */
        readonly textLines: Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper>;
        
        /**
         * you are expected to fill this with suggestions for autocomplete created using
         *  {@link #createSuggestion}
         */
        readonly autoCompleteSuggestions: Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AutoCompleteSuggestion>;
        
        /**
         * you are expected to fill this with a method to create right click actions.
         *  method should be `(index:number) => Map&lt;string,() => void&gt;`,
         *  meaning it accepts a character index and returns a map of names to actions.
         */
        rightClickActions: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<number, Java.Object, Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>>, any>;
        
    
        
        /**
         * 
         * @return <a target="_blank" href="https://github.com/noties/Prism4j/blob/75ac3dae6f8eff5b1b0396df3b806f44ce86c484/prism4j/src/main/java/io/noties/prism4j/Prism4j.java#L54">Prism4j's
         *      node list</a> you don't have to use it but if you're not compiling your own...
         *      peek at the code of {@link TextStyleCompiler} for the default impl for walking the node tree.
         */
        genPrismNodes(): Java.java.util.List<Java.io.noties.prism4j.Prism4j$Node>;
        
        /**
         * Easy access to the {@link Java.Map} object for use with {@link #rightClickActions}
         * @return specifically a {@link LinkedHashMap}
         */
        createMap(): Java.java.util.Map<any, any>;
        
        /**
         * more convenient access to TextBuilder
         * @return new instance for use with {@link #textLines}
         */
        createTextBuilder(): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
        createSuggestion(startIndex: number, suggestion: string): Java.xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AutoCompleteSuggestion;
        
        /**
         * 
         * @param startIndex index that is where the suggestion starts from before the already typed part
         * @param suggestion complete suggestion including the already typed part
         * @param displayText how the text should be displayed in the dropdown, default is suggestion text
         * @return a new suggestion object
         */
        createSuggestion(startIndex: number, suggestion: string, displayText: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AutoCompleteSuggestion;
        
        /**
         * prefix tree data structure written for you, it's a bit intensive to add things to, especially how I wrote it, but
         *  lookup times are much better at least on larger data sets,
         *  so create a single copy of this for your static autocompletes and don't be re-creating this every time, store it
         *  in `globalvars`, probably per language
         * 
         *  or just don't use it, I'm not forcing you to.
         * @return a new {@link StringHashTrie}
         */
        createPrefixTree(): Java.xyz.wagyourtail.StringHashTrie;
        
        /**
         * 
         * @return {@code key -> hex integer} values for theme data points, this can be used with the prism data for
         *      coloring, just have to use {@link TextBuilder#withColor(int, int, int)}
         *      on 1.15 and older versions the integer values with be the default color's index so you can directly pass it
         *      to {@link TextBuilder#withColor(int)}
         */
        getThemeData(): Java.java.util.Map<string, number[]>;
        
    }    
    
    export interface Damage extends BaseEvent {
        readonly attacker: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
        readonly source: string;
        readonly health: number;
        readonly change: number;
        
    
        toString(): string;
        
    }    
    
    export interface SendMessage extends BaseEvent {
        message: string;
        
    
        toString(): string;
        
    }    
    
    export interface Death extends BaseEvent {
        
    
        toString(): string;
        
    }    
    
    export interface ChunkUnload extends BaseEvent {
        readonly x: number;
        readonly z: number;
        
    
        toString(): string;
        
    }    
    
    export interface ResourcePackLoaded extends BaseEvent {
        readonly isGameStart: boolean;
        readonly loadedPacks: Java.java.util.List<string>;
        
    
        toString(): string;
        
    }    
    
    export interface PlayerJoin extends BaseEvent {
        readonly UUID: string;
        readonly player: Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerListEntryHelper;
        
    
        toString(): string;
        
    }    
    
    export interface EntityLoad extends BaseEvent {
        readonly entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
        
    
        toString(): string;
        
    }    
    
    export interface EntityDamaged extends BaseEvent {
        readonly entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
        
        /**
         * 
         * @since 1.6.5
         */
        readonly health: number;
        readonly damage: number;
        
    
        toString(): string;
        
    }    
    
    export interface Disconnect extends BaseEvent {
        
        /**
         * 
         * @since 1.6.4
         */
        readonly message: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
        
    
        toString(): string;
        
    }    
    
    export interface Tick extends BaseEvent {
        
    
        toString(): string;
        
    }    
    
    export interface Sound extends BaseEvent {
        readonly sound: string;
        readonly volume: number;
        readonly pitch: number;
        readonly position: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
        
    
        toString(): string;
        
    }    
    
    export interface ChunkLoad extends BaseEvent {
        readonly x: number;
        readonly z: number;
        readonly isFull: boolean;
        
    
        toString(): string;
        
    }    
    
    export interface DimensionChange extends BaseEvent {
        readonly dimension: string;
        
    
        toString(): string;
        
    }    
    
    export interface FallFlying extends BaseEvent {
        readonly state: boolean;
        
    
        toString(): string;
        
    }    
    
    export interface SignEdit extends BaseEvent {
        readonly pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
        closeScreen: boolean;
        signText: Java.java.util.List<string>;
        
    
        toString(): string;
        
    }    
    
    export interface BlockUpdate extends BaseEvent {
        readonly block: Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper;
        readonly updateType: string;
        
    
        toString(): string;
        
    }    
    
    export interface ItemDamage extends BaseEvent {
        readonly item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        readonly damage: number;
        
    
        toString(): string;
        
    }    
    
    export interface Riding extends BaseEvent {
        readonly state: boolean;
        readonly entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
        
    
        toString(): string;
        
    }    
    
    export interface PlayerLeave extends BaseEvent {
        readonly UUID: string;
        readonly player: Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerListEntryHelper;
        
    
        toString(): string;
        
    }    
    
    export interface Key extends BaseEvent {
        readonly action: number;
        readonly key: string;
        readonly mods: string;
        
    
        toString(): string;
        
        /**
         * turn an {@link Java.Integer} for key modifiers into a Translation Key.
         * @param mods
         * @return  * 
         * static
         */
        getKeyModifiers(mods: number): string;
        
        /**
         * turn a Translation Key for modifiers into an {@link Java.Integer}.
         * @param mods
         * @return  * 
         * static
         */
        getModInt(mods: string): number;
        
    }    
    
    export interface OpenScreen extends BaseEvent {
        readonly screen: Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
        readonly screenName: string;
        
    
        toString(): string;
        
    }    
    
    export interface HeldItemChange extends BaseEvent {
        readonly offHand: boolean;
        readonly item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        readonly oldItem: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        
    
        toString(): string;
        
    }    
    
    export interface Title extends BaseEvent {
        readonly type: string;
        message: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
        
    
        toString(): string;
        
    }    
    
    export interface JoinServer extends BaseEvent {
        readonly player: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper</* minecraft classes, as any, because obfuscation: */ any>;
        readonly address: string;
        
    
        toString(): string;
        
    }    
    
    export interface ItemPickup extends BaseEvent {
        readonly item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        
    
        toString(): string;
        
    }    
    
    export interface EXPChange extends BaseEvent {
        readonly progress: number;
        readonly total: number;
        readonly level: number;
        
        /**
         * 
         * @since 1.6.5
         */
        readonly prevProgress: number;
        
        /**
         * 
         * @since 1.6.5
         */
        readonly prevTotal: number;
        
        /**
         * 
         * @since 1.6.5
         */
        readonly prevLevel: number;
        
    
        toString(): string;
        
    }    
    
    export interface EntityUnload extends BaseEvent {
        readonly entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
        
    
        toString(): string;
        
    }    
    
    export interface Bossbar extends BaseEvent {
        readonly bossBar: Java.xyz.wagyourtail.jsmacros.client.api.helpers.BossBarHelper;
        readonly uuid: string;
        readonly type: string;
        
    
        toString(): string;
        
    }    
    
    export interface AirChange extends BaseEvent {
        readonly air: number;
        
    
        toString(): string;
        
    }    
    
    export interface ClickSlot extends BaseEvent {
        
        /**
         * <a href="https://wiki.vg/Protocol#Click_Window" target="_blank">https://wiki.vg/Protocol#Click_Window</a>
         */
        readonly mode: number;
        readonly button: number;
        readonly slot: number;
        
        /**
         * set to `true` to prevent the default action
         */
        cancel: boolean;
        
    
        
        /**
         * 
         * @return inventory associated with the event
         */
        getInventory(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<any>;
        toString(): string;
        
    }    
    
    export interface RecvMessage extends BaseEvent {
        text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
        
    
        toString(): string;
        
    }    
    
    export interface JoinedTick extends BaseEvent {
        
    
        toString(): string;
        
    }    
    
    export interface DropSlot extends BaseEvent {
        readonly slot: number;
        
        /**
         * whether it's all or a single item being dropped
         */
        readonly all: boolean;
        
        /**
         * set to `true` to cancel the default action
         */
        cancel: boolean;
        
    
        
        /**
         * 
         * @return inventory associated with the event
         */
        getInventory(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<any>;
        toString(): string;
        
    }    
    
    export interface HungerChange extends BaseEvent {
        readonly foodLevel: number;
        
    
        toString(): string;
        
    }    
    
    export interface ArmorChange extends BaseEvent {
        readonly slot: string;
        readonly item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        readonly oldItem: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
        
    
        toString(): string;
        
    }    
    
    export interface CommandContext extends BaseEvent {
        
    
        
        /**
         * 
         * @param name
         * @return 
         * @since 1.4.2
         * @throws CommandSyntaxException
         */
        getArg(name: string): Java.Object;
        getChild(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.CommandContextHelper;
        getRange(): Java.com.mojang.brigadier.context.StringRange;
        getInput(): string;
        
    }
}

declare namespace GlobalVars {

    
    /**
     * Put an Integer into the global variable space.
     * @since 1.0.4
     * @param name
     * @param i
     * @return 
     */
    function putInt(name: string, i: number): number;
    
    /**
     * put a String into the global variable space.
     * @since 1.0.4
     * @param name
     * @param str
     * @return 
     */
    function putString(name: string, str: string): string;
    
    /**
     * put a Double into the global variable space.
     * @since 1.0.8
     * @param name
     * @param d
     * @return 
     */
    function putDouble(name: string, d: number): number;
    
    /**
     * put a Boolean into the global variable space.
     * @since 1.1.7
     * @param name
     * @param b
     * @return 
     */
    function putBoolean(name: string, b: boolean): boolean;
    
    /**
     * put anything else into the global variable space.
     * @since 1.1.7
     * @param name
     * @param o
     * @return 
     */
    function putObject(name: string, o: Java.Object): Java.Object;
    
    /**
     * Returns the type of the defined item in the global variable space as a string.
     * @since 1.0.4
     * @param name
     * @return 
     */
    function getType(name: string): string;
    
    /**
     * Gets an Integer from the global variable space.
     * @since 1.0.4
     * @param name
     * @return 
     */
    function getInt(name: string): number;
    
    /**
     * Gets a String from the global variable space
     * @since 1.0.4
     * @param name
     * @return 
     */
    function getString(name: string): string;
    
    /**
     * Gets a Double from the global variable space.
     * @since 1.0.8
     * @param name
     * @return 
     */
    function getDouble(name: string): number;
    
    /**
     * Gets a Boolean from the global variable space.
     * @since 1.1.7
     * @param name
     * @return 
     */
    function getBoolean(name: string): boolean;
    
    /**
     * Gets an Object from the global variable space.
     * @since 1.1.7
     * @param name
     * @return 
     */
    function getObject(name: string): Java.Object;
    
    /**
     * removes a key from the global varaible space.
     * @since 1.2.0
     * @param key
     */
    function remove(key: string): void;
    function getRaw(): Java.java.util.Map<string, Java.Object>;
    
}

declare namespace Reflection {

    
    /**
     * 
     * @param name name of class like {@code path.to.class}
     * @return resolved class
     * @throws ClassNotFoundException
     * @see FReflection#getClass(String, String)
     * @since 1.2.3
     */
    function getClass(name: string): Java.Class<any>;
    
    /**
     * Use this to specify a class with intermediary and yarn names of classes for cleaner code. also has support for
     *  java primitives by using their name in lower case.
     * @param name first try
     * @param name2 second try
     * @return a {@link java.lang.Class Class} reference.
     * @throws ClassNotFoundException
     * @since 1.2.3
     */
    function getClass(name: string, name2: string): Java.Class<any>;
    
    /**
     * 
     * @param c
     * @param name
     * @param parameterTypes
     * @return 
     * @throws NoSuchMethodException
     * @throws SecurityException
     * @see FReflection#getDeclaredMethod(Class, String, String, Class...)
     * @since 1.2.3
     */
    function getDeclaredMethod(c: Java.Class<any>, name: string, parameterTypes: Java.Class<any>[]): Java.reflect.Method;
    
    /**
     * Use this to specify a method with intermediary and yarn names of classes for cleaner code.
     * @param c
     * @param name
     * @param name2
     * @param parameterTypes
     * @return a {@link java.lang.reflect.Method Method} reference.
     * @throws NoSuchMethodException
     * @throws SecurityException
     * @since 1.2.3
     */
    function getDeclaredMethod(c: Java.Class<any>, name: string, name2: string, parameterTypes: Java.Class<any>[]): Java.reflect.Method;
    
    /**
     * 
     * @since 1.6.0
     * @param c
     * @param name
     * @param name2
     * @param parameterTypes
     * @return 
     * @throws NoSuchMethodException
     */
    function getMethod(c: Java.Class<any>, name: string, name2: string, parameterTypes: Java.Class<any>[]): Java.reflect.Method;
    
    /**
     * 
     * @since 1.6.0
     * @param c
     * @param name
     * @param parameterTypes
     * @return 
     * @throws NoSuchMethodException
     */
    function getMethod(c: Java.Class<any>, name: string, parameterTypes: Java.Class<any>[]): Java.reflect.Method;
    
    /**
     * 
     * @param c
     * @param name
     * @return 
     * @throws NoSuchFieldException
     * @throws SecurityException
     * @see FReflection#getDeclaredField(Class, String, String)
     * @since 1.2.3
     */
    function getDeclaredField(c: Java.Class<any>, name: string): Java.reflect.Field;
    
    /**
     * Use this to specify a field with intermediary and yarn names of classes for cleaner code.
     * @param c
     * @param name
     * @param name2
     * @return a {@link java.lang.reflect.Field Field} reference.
     * @throws NoSuchFieldException
     * @throws SecurityException
     * @since 1.2.3
     */
    function getDeclaredField(c: Java.Class<any>, name: string, name2: string): Java.reflect.Field;
    
    /**
     * 
     * @since 1.6.0
     * @param c
     * @param name
     * @return 
     * @throws NoSuchFieldException
     */
    function getField(c: Java.Class<any>, name: string): Java.reflect.Field;
    
    /**
     * 
     * @since 1.6.0
     * @param c
     * @param name
     * @param name2
     * @return 
     * @throws NoSuchFieldException
     */
    function getField(c: Java.Class<any>, name: string, name2: string): Java.reflect.Field;
    
    /**
     * Invoke a method on an object with auto type coercion for numbers.
     * @param m method
     * @param c object (can be {@code null} for statics)
     * @param objects
     * @return 
     * @throws IllegalAccessException
     * @throws IllegalArgumentException
     * @throws InvocationTargetException
     * @since 1.2.3
     */
    function invokeMethod(m: Java.reflect.Method, c: Java.Object, objects: Java.Object[]): Java.Object;
    
    /**
     * Attempts to create a new instance of a class. You probably don't have to use this one and can just call `
     *  new` on a {@link Java.Class} unless you're in LUA, but then you also have the (kinda poorly
     *  doccumented, can someone find a better docs link for me)
     *  <a target="_blank" href="http://luaj.sourceforge.net/api/3.2/org/luaj/vm2/lib/jse/LuajavaLib.html">LuaJava Library</a>.
     * @param c
     * @param objects
     * @return 
     * @since 1.2.7
     */
    function newInstance<T>(c: Java.Class<T>, objects: Java.Object[]): T;
    
    /**
     * proxy for extending java classes in the guest language with proper threading support.
     * @param clazz
     * @param interfaces
     * @param <T>
     * @since 1.6.0
     * @return 
     */
    function createClassProxyBuilder<T>(clazz: Java.Class<T>, interfaces: Java.Class<any>[]): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder<T>;
    
    /**
     * Loads a jar file to be accessible with this library.
     * @param file relative to the script's folder.
     * @return success value
     * @throws IOException
     * @since 1.2.6
     */
    function loadJarFile(file: string): boolean;
    
    /**
     * 
     * @since 1.3.1
     * @return the previous mapping helper generated with {@link #loadMappingHelper(String)}
     */
    function loadCurrentMappingHelper(): Java.xyz.wagyourtail.jsmacros.core.classes.Mappings;
    
    /**
     * 
     * @param o class you want the name of
     * @since 1.3.1
     * @return the fully qualified class name (with "."'s not "/"'s)
     */
    function getClassName(o: Java.Object): string;
    
    /**
     * 
     * @param urlorfile a url or file path the the yarn mappings {@code -v2.jar} file, or {@code .tiny} file. for example {@code https://maven.fabricmc.net/net/fabricmc/yarn/1.16.5%2Bbuild.3/yarn-1.16.5%2Bbuild.3-v2.jar}, if same url/path as previous this will load from cache.
     * @since 1.3.1
     * @return the associated mapping helper.
     */
    function loadMappingHelper(urlorfile: string): Java.xyz.wagyourtail.jsmacros.core.classes.Mappings;
    
    /**
     * 
     * @since 1.6.5
     * @param instance
     * @param <T>
     * @return 
     */
    function wrapInstace<T>(instance: T): Java.xyz.wagyourtail.jsmacros.core.classes.WrappedClassInstance<T>;
    
    /**
     * 
     * @since 1.6.5
     * @param className
     * @return 
     * @throws ClassNotFoundException
     */
    function getWrappedClass(className: string): Java.xyz.wagyourtail.jsmacros.core.classes.WrappedClassInstance<any>;
    
}

declare namespace FS {

    
    /**
     * List files in path.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return An array of file names as {@link java.lang.String Strings}.
     */
    function list(path: string): string[];
    
    /**
     * Check if a file exists.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return 
     */
    function exists(path: string): boolean;
    
    /**
     * Check if a file is a directory.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return 
     */
    function isDir(path: string): boolean;
    
    /**
     * Get the last part (name) of a file.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return a {@link java.lang.String String} of the file name.
     */
    function getName(path: string): string;
    
    /**
     * Make a directory.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return a {@link java.lang.Boolean boolean} for success.
     */
    function makeDir(path: string): boolean;
    
    /**
     * Move a file.
     * @since 1.1.8
     * @param from relative to the script's folder.
     * @param to relative to the script's folder.
     * @throws IOException
     */
    function move(from: string, to: string): void;
    
    /**
     * Copy a file.
     * @since 1.1.8
     * @param from relative to the script's folder.
     * @param to relative to the script's folder.
     * @throws IOException
     */
    function copy(from: string, to: string): void;
    
    /**
     * Delete a file.
     * @since 1.2.9
     * @param path relative to the script's folder.
     * @return a {@link java.lang.Boolean boolean} for success.
     */
    function unlink(path: string): boolean;
    
    /**
     * Combine 2 paths.
     * @since 1.1.8
     * @param patha path is relative to the script's folder.
     * @param pathb
     * @return a {@link java.lang.String String} of the combined path.
     */
    function combine(patha: string, pathb: string): string;
    
    /**
     * Gets the directory part of a file path, or the parent directory of a folder.
     * @since 1.1.8
     * @param path relative to the script's folder.
     * @return a {@link java.lang.String String} of the combined path.
     * @throws IOException
     */
    function getDir(path: string): string;
    
    /**
     * Open a FileHandler for the file at the specified path.
     * @since 1.1.8
     * @see FileHandler
     * @param path relative to the script's folder.
     * @return a {@link FileHandler FileHandler} for the file path.
     */
    function open(path: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
    
}

declare namespace Request {

    
    /**
     * create a HTTPRequest handler to the specified URL
     * @since 1.1.8
     * @see HTTPRequest
     * @param url
     * @return Request Wrapper
     * @throws IOException
     */
    function create(url: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest;
    
    /**
     * 
     * @since 1.1.8
     * @see FRequest#get(String, Map)
     * @param url
     * @return 
     * @throws IOException
     */
    function get(url: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
    
    /**
     * send a GET request to the specified URL.
     * @since 1.1.8
     * @see HTTPRequest.Response
     * @param url
     * @param headers
     * @return Response Data
     * @throws IOException
     */
    function get(url: string, headers: Java.java.util.Map<string, string>): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
    
    /**
     * 
     * @see FRequest#post(String, String, Map)
     * @since 1.1.8
     * @param url
     * @param data
     * @return 
     * @throws IOException
     */
    function post(url: string, data: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
    
    /**
     * send a POST request to the specified URL.
     * @since 1.1.8
     * @param url
     * @param data
     * @param headers
     * @return Response Data
     * @throws IOException
     */
    function post(url: string, data: string, headers: Java.java.util.Map<string, string>): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
    
    /**
     * Create a Websocket handler.
     * @since 1.2.7
     * @see Websocket
     * @param url
     * @return 
     * @throws IOException
     */
    function createWS(url: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
    
    /**
     * Create a Websocket handler.
     * @since 1.1.9
     * @deprecated 1.2.7
     * @param url
     * @return 
     * @throws IOException
     */
    function createWS2(url: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
    
}

declare namespace JavaWrapper {

    
    /**
     * 
     * @param c
     * @return a new {@link MethodWrapper MethodWrapper}
     * @since 1.3.2
     */
    function methodToJava<A, B, R>(c: (arg0?: A, arg1?: B) => R | void): Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<A, B, R, Java.xyz.wagyourtail.jsmacros.core.language.BaseScriptContext<Java.org.graalvm.polyglot.Context>>;
    
    /**
     * 
     * @param c
     * @return a new {@link MethodWrapper MethodWrapper}
     * @since 1.3.2
     */
    function methodToJavaAsync<A, B, R>(c: (arg0?: A, arg1?: B) => R | void): Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<A, B, R, Java.xyz.wagyourtail.jsmacros.core.language.BaseScriptContext<Java.org.graalvm.polyglot.Context>>;
    
    /**
     * JS only, puts current task at end of queue.
     *  use with caution, don't accidentally cause circular waiting.
     * @throws InterruptedException
     */
    function deferCurrentTask(): void;
    
    /**
     * Close the current context, more important in JEP as they won't close themselves if you use other functions in
     *  this class
     * @since 1.2.2
     */
    function stop(): void;
    
}

declare namespace JsMacros {

    
    /**
     * 
     * @return the JsMacros profile class.
     */
    function getProfile(): Java.xyz.wagyourtail.jsmacros.core.config.BaseProfile;
    
    /**
     * 
     * @return the JsMacros config management class.
     */
    function getConfig(): Java.xyz.wagyourtail.jsmacros.core.config.ConfigManager;
    
    /**
     * services are background scripts designed to run full time and are mainly noticed by their side effects.
     * @since 1.6.3
     * @return for managing services.
     */
    function getServiceManager(): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager;
    
    /**
     * 
     * @return list of non-garbage-collected ScriptContext's
     * @since 1.4.0
     */
    function getOpenContexts(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.core.language.BaseScriptContext<any>>;
    
    /**
     * 
     * @see FJsMacros#runScript(String, String, MethodWrapper)
     * @since 1.1.5
     * @param file
     * @return 
     */
    function runScript(file: string): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * 
     * @since 1.6.3
     * @param file
     * @param fakeEvent you probably actually want to pass an instance created by {@link #createCustomEvent(String)}
     * @return 
     */
    function runScript(file: string, fakeEvent: Events.BaseEvent): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * runs a script with a eventCustom to be able to pass args
     * @since 1.6.3 (1.1.5 - 1.6.3 didn't have fakeEvent)
     * @param file
     * @param fakeEvent
     * @param callback
     * @return container the script is running on.
     */
    function runScript(file: string, fakeEvent: Events.BaseEvent, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Throwable, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * 
     * @see FJsMacros#runScript(String, String, MethodWrapper)
     * @since 1.2.4
     * @param language
     * @param script
     * @return 
     */
    function runScript(language: string, script: string): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * Runs a string as a script.
     * @since 1.2.4
     * @param language
     * @param script
     * @param callback calls your method as a {@link java.util.function.Consumer Consumer}&lt;{@link String}&gt;
     * @return the {@link EventContainer} the script is running on.
     */
    function runScript(language: string, script: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Throwable, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * 
     * @since 1.6.0
     * @param language
     * @param script
     * @param file
     * @param callback
     * @return 
     */
    function runScript(language: string, script: string, file: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Throwable, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
    
    /**
     * Opens a file with the default system program.
     * @since 1.1.8
     * @param path relative to the script's folder.
     */
    function open(path: string): void;
    
    /**
     * 
     * @since 1.6.0
     * @param url
     * @throws MalformedURLException
     */
    function openUrl(url: string): void;
    
    /**
     * Creates a listener for an event, this function can be more efficient that running a script file when used properly.
     * @see IEventListener
     * @since 1.2.7
     * @param event
     * @param callback calls your method as a {@link java.util.function.BiConsumer BiConsumer}&lt;{@link BaseEvent}, {@link EventContainer}&gt;
     * @return 
     */
    function on(event: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Events.BaseEvent, Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.event.IEventListener;
    
    /**
     * Creates a single-run listener for an event, this function can be more efficient that running a script file when used properly.
     * @see IEventListener
     * @since 1.2.7
     * @param event
     * @param callback calls your method as a {@link java.util.function.BiConsumer BiConsumer}&lt;{@link BaseEvent}, {@link EventContainer}&gt;
     * @return the listener.
     */
    function once(event: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Events.BaseEvent, Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.event.IEventListener;
    
    /**
     * 
     * @see FJsMacros#off(String, IEventListener)
     * @since 1.2.3
     * @param listener
     * @return 
     */
    function off(listener: Java.xyz.wagyourtail.jsmacros.core.event.IEventListener): boolean;
    
    /**
     * Removes a {@link Java.IEventListener} from an event.
     * @see IEventListener
     * @since 1.2.3
     * @param event
     * @param listener
     * @return 
     */
    function off(event: string, listener: Java.xyz.wagyourtail.jsmacros.core.event.IEventListener): boolean;
    
    /**
     * 
     * @param event event to wait for
     * @since 1.5.0
     * @return a event and a new context if the event you're waiting for was joined, to leave it early.
     * @throws InterruptedException
     */
    function waitForEvent(event: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros$EventAndContext;
    
    /**
     * 
     * @param event
     * @return 
     * @throws InterruptedException
     */
    function waitForEvent(event: string, filter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Events.BaseEvent, Java.Object, boolean, any>): Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros$EventAndContext;
    
    /**
     * waits for an event. if this thread is bound to an event already, this will release current lock.
     * @param event event to wait for
     * @param filter filter the event until it has the proper values or whatever.
     * @param runBeforeWaiting runs as a {@link Runnable}, run before waiting, this is a thread-safety thing to prevent "interrupts" from going in between this and things like deferCurrentTask
     * @since 1.5.0
     * @return a event and a new context if the event you're waiting for was joined, to leave it early.
     * @throws InterruptedException
     */
    function waitForEvent(event: string, filter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Events.BaseEvent, Java.Object, boolean, any>, runBeforeWaiting: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros$EventAndContext;
    
    /**
     * 
     * @since 1.2.3
     * @param event
     * @return a list of script-added listeners.
     */
    function listeners(event: string): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.core.event.IEventListener>;
    
    /**
     * create a custom event object that can trigger a event. It's recommended to use 
     *  {@link Java.EventCustom#registerEvent} to set up the event to be visible in the GUI.
     * @see BaseEventRegistry#addEvent(String)
     * @param eventName name of the event. please don't use an existing one... your scripts might not like that.
     * @since 1.2.8
     * @return 
     */
    function createCustomEvent(eventName: string): Java.xyz.wagyourtail.jsmacros.core.event.impl.EventCustom;
    
}

declare namespace Client {

    
    /**
     * 
     * @since 1.0.0 (was in the {@code jsmacros} library until 1.2.9)
     * @return the raw minecraft client class, it may be useful to use <a target="_blank" href="https://wagyourtail.xyz/Projects/Minecraft%20Mappings%20Viewer/App">Minecraft Mappings Viewer</a> for this.
     */
    function getMinecraft(): /* minecraft classes, as any, because obfuscation: */ any;
    
    /**
     * Run your task on the main minecraft thread
     * @param runnable task to run
     * @since 1.4.0
     */
    function runOnMainThread(runnable: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>): void;
    
    /**
     * 
     * @since 1.6.5
     * @param runnable
     * @param watchdogMaxTime max time for the watchdog to wait before killing the script
     */
    function runOnMainThread(runnable: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>, watchdogMaxTime: number): void;
    
    /**
     * 
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper
     * @since 1.1.7 (was in the {@code jsmacros} library until 1.2.9)
     * @return an {@link xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper OptionsHelper} for the game options.
     */
    function getGameOptions(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper;
    
    /**
     * 
     * @return the current minecraft version as a {@link java.lang.String String}.
     * @since 1.1.2 (was in the {@code jsmacros} library until 1.2.9)
     */
    function mcVersion(): string;
    
    /**
     * 
     * @since 1.2.0 (was in the {@code jsmacros} library until 1.2.9)
     * @return the fps debug string from minecraft.
     */
    function getFPS(): string;
    
    /**
     * 
     * @since 1.2.3 (was in the {@code jsmacros} library until 1.2.9)
     * @see #connect(String, int)
     * @param ip
     */
    function connect(ip: string): void;
    
    /**
     * Connect to a server
     * @since 1.2.3 (was in the {@code jsmacros} library until 1.2.9)
     * @param ip
     * @param port
     */
    function connect(ip: string, port: number): void;
    
    /**
     * 
     * @since 1.2.3 (was in the {@code jsmacros} library until 1.2.9)
     * @see #disconnect(MethodWrapper)
     */
    function disconnect(): void;
    
    /**
     * Disconnect from a server with callback.
     * @since 1.2.3 (was in the {@code jsmacros} library until 1.2.9)
     * 
     *  {@code callback} defaults to {@code null}
     * @param callback calls your method as a {@link java.util.function.Consumer Consumer}&lt;{@link java.lang.Boolean Boolean}&gt;
     */
    function disconnect(callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<boolean, Java.Object, Java.Object, any>): void;
    
    /**
     * Closes the client (stops the game).
     *  Waits until the game has stopped, meaning no further code is executed (for obvious reasons).
     *  Warning: this does not wait on joined threads, so your script may stop at an undefined point.
     * @since 1.6.0
     */
    function shutdown(): void;
    
    /**
     * 
     * @since 1.2.4
     * @see #waitTick(int)
     * @throws InterruptedException
     */
    function waitTick(): void;
    
    /**
     * waits the specified number of client ticks.
     *  don't use this on an event that the main thread waits on (joins)... that'll cause circular waiting.
     * @since 1.2.6
     * @param i
     * @throws InterruptedException
     */
    function waitTick(i: number): void;
    
}

declare namespace Time {

    
    /**
     * 
     * @return current time in MS.
     */
    function time(): number;
    
    /**
     * Sleeps the current thread for the specified time in MS.
     * @param millis
     * @throws InterruptedException
     */
    function sleep(millis: number): void;
    
}

declare namespace KeyBind {

    
    /**
     * Dont use this one... get the raw minecraft keycode class.
     * @param keyName
     * @return the raw minecraft keycode class
     */
    function getKeyCode(keyName: string): /* minecraft classes, as any, because obfuscation: */ any;
    
    /**
     * 
     * @since 1.2.2
     * @return A {@link java.util.Map Map} of all the minecraft keybinds.
     */
    function getKeyBindings(): Java.java.util.Map<string, string>;
    
    /**
     * Sets a minecraft keybind to the specified key.
     * @since 1.2.2
     * @param bind
     * @param key
     */
    function setKeyBind(bind: string, key: string): void;
    
    /**
     * Set a key-state for a key.
     * @param keyName
     * @param keyState
     */
    function key(keyName: string, keyState: boolean): void;
    
    /**
     * Set a key-state using the name of the keybind rather than the name of the key.
     *  
     *  This is probably the one you should use.
     * @since 1.2.2
     * @param keyBind
     * @param keyState
     */
    function keyBind(keyBind: string, keyState: boolean): void;
    
    /**
     * 
     * @since 1.2.6
     * @return a list of currently pressed keys.
     */
    function getPressedKeys(): Java.java.util.List<string>;
    
}

declare namespace World {

    
    /**
     * returns whether a world is currently loaded
     * @since 1.3.0
     * @return 
     */
    function isWorldLoaded(): boolean;
    
    /**
     * 
     * @return players within render distance.
     */
    function getLoadedPlayers(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerEntityHelper</* minecraft classes, as any, because obfuscation: */ any>>;
    
    /**
     * 
     * @return players on the tablist.
     */
    function getPlayers(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerListEntryHelper>;
    
    /**
     * 
     * @param x
     * @param y
     * @param z
     * @return The block at that position.
     */
    function getBlock(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper;
    function getBlock(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper;
    function getBlock(pos: Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper;
    
    /**
     * Usage: <br>
     *  This will return all blocks that are facing south, don't require a tool to break, 
     *  have a hardness of 10 or less and whose name contains either chest or barrel.
     *  <pre>
     *  World.getWorldScanner()
     *      .withBlockFilter("getHardness").is("<=", 10)
     *      .andStringBlockFilter().contains("chest", "barrel")
     *      .withStringStateFilter().contains("facing=south")
     *      .andStateFilter("isToolRequired").is(false)
     *      .build()
     *  </pre>
     * @return a builder to create a WorldScanner
     * @since 1.6.5
     */
    function getWorldScanner(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
    
    /**
     * 
     * @return a scanner for the current world
     * @since 1.6.5
     */
    function getWorldScanner(blockFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockHelper, Java.Object, boolean, any>, stateFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper, Java.Object, boolean, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScanner;
    
    /**
     * 
     * @since 1.6.4
     * @param id
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(centerX: number, centerZ: number, id: string, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.6.4
     * @param id
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(id: string, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.6.4
     * @param ids
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(ids: Java.java.util.List<string>, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.6.4
     * @param centerX
     * @param centerZ
     * @param ids
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(centerX: number, centerZ: number, ids: Java.java.util.List<string>, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.6.4
     * @param blockFilter
     * @param stateFilter
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(blockFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockHelper, Java.Object, boolean, any>, stateFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper, Java.Object, boolean, any>, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.6.4
     * @param chunkX
     * @param chunkZ
     * @param blockFilter
     * @param stateFilter
     * @param chunkrange
     * @return 
     */
    function findBlocksMatching(chunkX: number, chunkZ: number, blockFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockHelper, Java.Object, boolean, any>, stateFilter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper, Java.Object, boolean, any>, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * 
     * @since 1.2.9
     * @return a helper for the scoreboards provided to the client.
     */
    function getScoreboards(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ScoreboardsHelper;
    
    /**
     * 
     * @return all entities in the render distance.
     */
    function getEntities(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>>;
    
    /**
     * 
     * @since 1.1.2
     * @return the current dimension.
     */
    function getDimension(): string;
    
    /**
     * 
     * @since 1.1.5
     * @return the current biome.
     */
    function getBiome(): string;
    
    /**
     * 
     * @since 1.1.5
     * @return the current world time.
     */
    function getTime(): number;
    
    /**
     * This is supposed to be time of day, but it appears to be the same as {@link Java.FWorld#getTime} to me...
     * @since 1.1.5
     * @return the current world time of day.
     */
    function getTimeOfDay(): number;
    
    /**
     * 
     * @since 1.2.6
     * @return respawn position.
     */
    function getRespawnPos(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
    
    /**
     * 
     * @since 1.2.6
     * @return world difficulty as an {@link java.lang.Integer Integer}.
     */
    function getDifficulty(): number;
    
    /**
     * 
     * @since 1.2.6
     * @return moon phase as an {@link java.lang.Integer Integer}.
     */
    function getMoonPhase(): number;
    
    /**
     * 
     * @since 1.1.2
     * @param x
     * @param y
     * @param z
     * @return sky light as an {@link java.lang.Integer Integer}.
     */
    function getSkyLight(x: number, y: number, z: number): number;
    
    /**
     * 
     * @since 1.1.2
     * @param x
     * @param y
     * @param z
     * @return block light as an {@link java.lang.Integer Integer}.
     */
    function getBlockLight(x: number, y: number, z: number): number;
    
    /**
     * plays a sound file using javax's sound stuff.
     * @since 1.1.7
     * @param file
     * @param volume
     * @return 
     * @throws LineUnavailableException
     * @throws IOException
     * @throws UnsupportedAudioFileException
     */
    function playSoundFile(file: string, volume: number): Java.javax.sound.sampled.Clip;
    
    /**
     * 
     * @since 1.1.7
     * @see FWorld#playSound(String, double, double, double, double, double)
     * @param id
     */
    function playSound(id: string): void;
    
    /**
     * 
     * @since 1.1.7
     * @see FWorld#playSound(String, double, double, double, double, double)
     * @param id
     * @param volume
     */
    function playSound(id: string, volume: number): void;
    
    /**
     * 
     * @since 1.1.7
     * @see FWorld#playSound(String, double, double, double, double, double)
     * @param id
     * @param volume
     * @param pitch
     */
    function playSound(id: string, volume: number, pitch: number): void;
    
    /**
     * plays a minecraft sound using the internal system.
     * @since 1.1.7
     * @param id
     * @param volume
     * @param pitch
     * @param x
     * @param y
     * @param z
     */
    function playSound(id: string, volume: number, pitch: number, x: number, y: number, z: number): void;
    
    /**
     * 
     * @since 1.2.1
     * @return a map of boss bars by the boss bar's UUID.
     */
    function getBossBars(): Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.client.api.helpers.BossBarHelper>;
    
    /**
     * Check whether a chunk is within the render distance and loaded.
     * @since 1.2.2
     * @param chunkX
     * @param chunkZ
     * @return 
     */
    function isChunkLoaded(chunkX: number, chunkZ: number): boolean;
    
    /**
     * 
     * @since 1.2.2
     * @return the current server address as a string ({@code server.address/server.ip:port}).
     */
    function getCurrentServerAddress(): string;
    
    /**
     * 
     * @since 1.2.2 [Citation Needed]
     * @param x
     * @param z
     * @return biome at specified location, only works if the block/chunk is loaded.
     */
    function getBiomeAt(x: number, z: number): string;
    
    /**
     * 
     * @since 1.2.7
     * @return best attempt to measure and give the server tps with various timings.
     */
    function getServerTPS(): string;
    
    /**
     * 
     * @since 1.3.1
     * @return text helper for the top part of the tab list (above the players)
     */
    function getTabListHeader(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
    
    /**
     * 
     * @since 1.3.1
     * @return text helper for the bottom part of the tab list (below the players)
     */
    function getTabListFooter(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
    
    /**
     * 
     * @since 1.2.7
     * @return best attempt to measure and give the server tps.
     */
    function getServerInstantTPS(): number;
    
    /**
     * 
     * @since 1.2.7
     * @return best attempt to measure and give the server tps over the previous 1 minute average.
     */
    function getServer1MAverageTPS(): number;
    
    /**
     * 
     * @since 1.2.7
     * @return best attempt to measure and give the server tps over the previous 5 minute average.
     */
    function getServer5MAverageTPS(): number;
    
    /**
     * 
     * @since 1.2.7
     * @return best attempt to measure and give the server tps over the previous 15 minute average.
     */
    function getServer15MAverageTPS(): number;
    
}

declare namespace PositionCommon {

    
    /**
     * create a new vector object
     * @since 1.6.3
     * @param x1
     * @param y1
     * @param z1
     * @param x2
     * @param y2
     * @param z2
     * @return 
     */
    function createVec(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
    
    /**
     * 
     * @since 1.6.3
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return 
     */
    function createVec(x1: number, y1: number, x2: number, y2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
    
    /**
     * 
     * @since 1.6.3
     * @param x
     * @param y
     * @param z
     * @return 
     */
    function createPos(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
    
    /**
     * 
     * @since 1.6.3
     * @param x
     * @param y
     * @return 
     */
    function createPos(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
    
}

declare namespace Player {

    
    /**
     * 
     * @return the Inventory handler
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Inventory
     */
    function openInventory(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<any>;
    
    /**
     * 
     * @return the player entity wrapper.
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper
     * @since 1.0.3
     */
    function getPlayer(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper</* minecraft classes, as any, because obfuscation: */ any>;
    
    /**
     * 
     * @return the player's current gamemode.
     * @since 1.0.9
     */
    function getGameMode(): string;
    
    /**
     * 
     * @param distance
     * @param fluid
     * @return the block/liquid the player is currently looking at.
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper
     * @since 1.0.5
     */
    function rayTraceBlock(distance: number, fluid: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockDataHelper;
    
    /**
     * 
     * @return the entity the player is currently looking at.
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper
     * @since 1.0.5
     */
    function rayTraceEntity(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
    
    /**
     * Write to a sign screen if a sign screen is currently open.
     * @param l1
     * @param l2
     * @param l3
     * @param l4
     * @return of success.
     * @since 1.2.2
     */
    function writeSign(l1: string, l2: string, l3: string, l4: string): boolean;
    
    /**
     * 
     * @param folder
     * @param callback calls your method as a {@link Consumer}&lt;{@link TextHelper}&gt;
     * @see #takeScreenshot(String, String, MethodWrapper)
     * @since 1.2.6
     */
    function takeScreenshot(folder: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, Java.Object, Java.Object, any>): void;
    
    /**
     * Take a screenshot and save to a file.
     *  <p>
     *  `file` is the optional one, typescript doesn't like it not being the last one that's optional
     * @param folder
     * @param file
     * @param callback calls your method as a {@link Consumer}&lt;{@link TextHelper}&gt;
     * @since 1.2.6
     */
    function takeScreenshot(folder: string, file: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, Java.Object, Java.Object, any>): void;
    
    /**
     * Creates a new PlayerInput object.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput
     * @since 1.4.0
     */
    function createPlayerInput(): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Creates a new PlayerInput object.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput
     * @since 1.4.0
     */
    function createPlayerInput(movementForward: number, movementSideways: number, yaw: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Creates a new PlayerInput object.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput
     * @since 1.4.0
     */
    function createPlayerInput(movementForward: number, yaw: number, jumping: boolean, sprinting: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Creates a new PlayerInput object.
     * @param movementForward 1 = forward input (W); 0 = no input; -1 = backward input (S)
     * @param movementSideways 1 = left input (A); 0 = no input; -1 = right input (D)
     * @param yaw yaw of the player
     * @param pitch pitch of the player
     * @param jumping jump input
     * @param sneaking sneak input
     * @param sprinting sprint input
     * @see xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput
     * @since 1.4.0
     */
    function createPlayerInput(movementForward: number, movementSideways: number, yaw: number, pitch: number, jumping: boolean, sneaking: boolean, sprinting: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Parses each row of CSV string into a `PlayerInput`.
     *  The capitalization of the header matters.<br>
     *  About the columns:
     *  <ul>
     *    <li> `movementForward` and `movementSideways` as a number</li>
     *    <li>`yaw` and `pitch` as an absolute number</li>
     *    <li>`jumping`, `sneaking` and `sprinting` have to be boolean</li>
     *  </ul>
     *  <p>
     *  The separation must be a "," it's a csv...(but spaces don't matter)<br>
     *  Quoted values don't work
     * @param csv CSV string to be parsed
     * @see PlayerInput#PlayerInput(float, float, float, float, boolean, boolean, boolean)
     * @since 1.4.0
     */
    function createPlayerInputsFromCsv(csv: string): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput>;
    
    /**
     * Parses a JSON string into a `PlayerInput` Object
     *  For details see `PlayerInput.fromCsv()`, on what has to be present.<br>
     *  Capitalization of the keys matters.
     * @param json JSON string to be parsed
     * @return The JSON parsed into a {@code PlayerInput}
     * @see #createPlayerInputsFromCsv(String)
     * @since 1.4.0
     */
    function createPlayerInputsFromJson(json: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Creates a new `PlayerInput` object with the current inputs of the player.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput
     * @since 1.4.0
     */
    function getCurrentPlayerInput(): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
    
    /**
     * Adds a new `PlayerInput` to `MovementQueue` to be executed
     * @param input the PlayerInput to be executed
     * @see xyz.wagyourtail.jsmacros.client.movement.MovementQueue
     * @since 1.4.0
     */
    function addInput(input: Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput): void;
    
    /**
     * Adds multiple new `PlayerInput` to `MovementQueue` to be executed
     * @param inputs the PlayerInputs to be executed
     * @see xyz.wagyourtail.jsmacros.client.movement.MovementQueue
     * @since 1.4.0
     */
    function addInputs(inputs: Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput>): void;
    
    /**
     * Clears all inputs in the `MovementQueue`
     * @see xyz.wagyourtail.jsmacros.client.movement.MovementQueue
     * @since 1.4.0
     */
    function clearInputs(): void;
    function setDrawPredictions(val: boolean): void;
    
    /**
     * Predicts where one tick with a `PlayerInput` as input would lead to.
     * @param input the PlayerInput for the prediction
     * @return the position after the input
     * @see #predictInput(PlayerInput, boolean)
     * @since 1.4.0
     */
    function predictInput(input: Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
    
    /**
     * Predicts where one tick with a `PlayerInput` as input would lead to.
     * @param input the PlayerInput for the prediction
     * @param draw whether to visualize the result or not
     * @return the position after the input
     * @since 1.4.0
     */
    function predictInput(input: Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput, draw: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
    
    /**
     * Predicts where each `PlayerInput` executed in a row would lead
     *  without drawing it.
     * @param inputs the PlayerInputs for each tick for the prediction
     * @return the position after each input
     * @see #predictInputs(List, boolean)
     * @since 1.4.0
     */
    function predictInputs(inputs: Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput>): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * Predicts where each `PlayerInput` executed in a row would lead
     * @param inputs the PlayerInputs for each tick for the prediction
     * @param draw whether to visualize the result or not
     * @return the position after each input
     * @since 1.4.0
     */
    function predictInputs(inputs: Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput>, draw: boolean): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
    
    /**
     * Adds a forward movement with a relative yaw value to the MovementQueue.
     * @param yaw the relative yaw for the player
     * @since 1.4.0
     */
    function moveForward(yaw: number): void;
    
    /**
     * Adds a backward movement with a relative yaw value to the MovementQueue.
     * @param yaw the relative yaw for the player
     * @since 1.4.0
     */
    function moveBackward(yaw: number): void;
    
    /**
     * Adds sideways movement with a relative yaw value to the MovementQueue.
     * @param yaw the relative yaw for the player
     * @since 1.4.2
     */
    function moveStrafeLeft(yaw: number): void;
    
    /**
     * Adds sideways movement with a relative yaw value to the MovementQueue.
     * @param yaw the relative yaw for the player
     * @since 1.4.2
     */
    function moveStrafeRight(yaw: number): void;
    
}

declare namespace Hud {

    
    /**
     * 
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen
     * @since 1.0.5
     * @param title
     * @param dirtBG boolean of whether to use a dirt background or not.
     * @return a new {@link xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen IScreen} Object.
     */
    function createScreen(title: string, dirtBG: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.ScriptScreen;
    
    /**
     * Opens a {@link Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen} Object.
     * @since 1.0.5
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen
     * @param s
     */
    function openScreen(s: Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen): void;
    
    /**
     * 
     * @since 1.2.7
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen
     * @return the currently open Screen as an {@link xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen IScreen}
     */
    function getOpenScreen(): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
    
    /**
     * 
     * @since 1.0.5, renamed from {@code getOpenScreen} in 1.2.7
     * @return The name of the currently open screen.
     */
    function getOpenScreenName(): string;
    
    /**
     * 
     * @since 1.1.2
     * @return a {@link java.lang.Boolean boolean} denoting if the currently open screen is a container.
     */
    function isContainer(): boolean;
    
    /**
     * 
     * @since 1.0.5
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D
     * @return 
     */
    function createDraw2D(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
    
    /**
     * 
     * @since 1.0.5
     *  
     *  Registers an {@link xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D IDraw2D} to be rendered.
     * @deprecated since 1.6.5, use {@link Draw2D#register()} instead.
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D
     * @param overlay
     */
    function registerDraw2D(overlay: Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D>): void;
    
    /**
     * 
     * @since 1.0.5
     *  
     *  Unregisters an {@link xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D IDraw2D} to stop it being rendered.
     * @deprecated since 1.6.5, use {@link Draw2D#unregister()} instead.
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D
     * @param overlay
     */
    function unregisterDraw2D(overlay: Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D>): void;
    
    /**
     * 
     * @since 1.0.5
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D
     * @return A list of current {@link xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D IDraw2Ds}.
     */
    function listDraw2Ds(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D>>;
    
    /**
     * 
     * @since 1.0.5
     *  
     *  clears the Draw2D render list.
     * @see xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D
     */
    function clearDraw2Ds(): void;
    
    /**
     * 
     * @since 1.0.6
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Draw3D
     * @return a new {@link xyz.wagyourtail.jsmacros.client.api.classes.Draw3D Draw3D}.
     */
    function createDraw3D(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D;
    
    /**
     * 
     * @since 1.0.6
     *  
     *  Registers an {@link xyz.wagyourtail.jsmacros.client.api.classes.Draw3D Draw3D} to be rendered.
     * @deprecated since 1.6.5 use {@link Draw3D#register()} instead.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Draw3D
     * @param draw
     */
    function registerDraw3D(draw: Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D): void;
    
    /**
     * 
     * @since 1.0.6
     *  
     *  Unregisters an {@link xyz.wagyourtail.jsmacros.client.api.classes.Draw3D Draw3D} to stop it being rendered.
     * @since 1.6.5 use {@link Draw3D#unregister()} instead.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Draw3D
     * @param draw
     */
    function unregisterDraw3D(draw: Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D): void;
    
    /**
     * 
     * @since 1.0.6
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Draw3D
     * @return A list of current {@link xyz.wagyourtail.jsmacros.client.api.classes.Draw3D Draw3D}.
     */
    function listDraw3Ds(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D>;
    
    /**
     * 
     * @since 1.0.6
     *  
     *  clears the Draw2D render list.
     * @see xyz.wagyourtail.jsmacros.client.api.classes.Draw3D
     */
    function clearDraw3Ds(): void;
    
    /**
     * 
     * @since 1.1.3
     * @return the current X coordinate of the mouse
     */
    function getMouseX(): number;
    
    /**
     * 
     * @since 1.1.3
     * @return the current Y coordinate of the mouse
     */
    function getMouseY(): number;
    
}

declare namespace Chat {

    
    /**
     * Log to player chat.
     * @since 1.1.3
     * @param message
     */
    function log(message: Java.Object): void;
    
    /**
     * 
     * @param message
     * @param await should wait for message to actually be sent to chat to continue.
     * @throws InterruptedException
     */
    function log(message: Java.Object, await: boolean): void;
    
    /**
     * Say to server as player.
     * @since 1.0.0
     * @param message
     */
    function say(message: string): void;
    
    /**
     * Say to server as player.
     * @param message
     * @param await
     * @since 1.3.1
     * @throws InterruptedException
     */
    function say(message: string, await: boolean): void;
    
    /**
     * open the chat input box with specific text already typed.
     * @since 1.6.4
     * @param message the message to start the chat screen with
     */
    function open(message: string): void;
    
    /**
     * open the chat input box with specific text already typed.
     *  hint: you can combine with {@link Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros#waitForEvent} or
     *  {@link Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros#once} to wait for the chat screen
     *  to close and/or the to wait for the sent message
     * @since 1.6.4
     * @param message the message to start the chat screen with
     * @param await
     */
    function open(message: string, await: boolean): void;
    
    /**
     * Display a Title to the player.
     * @since 1.2.1
     * @param title
     * @param subtitle
     * @param fadeIn
     * @param remain
     * @param fadeOut
     */
    function title(title: Java.Object, subtitle: Java.Object, fadeIn: number, remain: number, fadeOut: number): void;
    
    /**
     * Display the smaller title that's above the actionbar.
     * @since 1.2.1
     * @param text
     * @param tinted
     */
    function actionbar(text: Java.Object, tinted: boolean): void;
    
    /**
     * Display a toast.
     * @since 1.2.5
     * @param title
     * @param desc
     */
    function toast(title: Java.Object, desc: Java.Object): void;
    
    /**
     * Creates a {@link Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper} for use where you need one and not a string.
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper
     * @since 1.1.3
     * @param content
     * @return a new {@link xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper TextHelper}
     */
    function createTextHelperFromString(content: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
    
    /**
     * 
     * @since 1.5.2
     * @return 
     */
    function getLogger(): Java.org.apache.logging.log4j.Logger;
    
    /**
     * returns a log4j logger, for logging to console only.
     * @since 1.5.2
     * @param name
     * @return 
     */
    function getLogger(name: string): Java.org.apache.logging.log4j.Logger;
    
    /**
     * Create a  {@link Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper} for use where you need one and not a string.
     * @see xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper
     * @since 1.1.3
     * @param json
     * @return a new {@link xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper TextHelper}
     */
    function createTextHelperFromJSON(json: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
    
    /**
     * 
     * @see TextBuilder
     * @since 1.3.0
     * @return a new builder
     */
    function createTextBuilder(): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
    
    /**
     * 
     * @param name name of command
     * @since 1.4.2
     * @return 
     */
    function createCommandBuilder(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
    function getHistory(): Java.xyz.wagyourtail.jsmacros.client.api.classes.ChatHistoryManager;
    
}

declare namespace Java {

    export interface Thread extends Java.Object, Java.Runnable {
        // static
        readonly MIN_PRIORITY: number;
        // static
        readonly NORM_PRIORITY: number;
        // static
        readonly MAX_PRIORITY: number;
        
    
        // static
        currentThread(): Java.Thread;
        // static
        yield(): void;
        // static
        sleep(arg0: number): void;
        // static
        sleep(arg0: number, arg1: number): void;
        // static
        onSpinWait(): void;
        start(): void;
        run(): void;
        stop(): void;
        interrupt(): void;
        // static
        interrupted(): boolean;
        isInterrupted(): boolean;
        isAlive(): boolean;
        suspend(): void;
        resume(): void;
        setPriority(arg0: number): void;
        getPriority(): number;
        setName(arg0: string): void;
        getName(): string;
        getThreadGroup(): Java.ThreadGroup;
        // static
        activeCount(): number;
        // static
        enumerate(arg0: Java.Thread[]): number;
        countStackFrames(): number;
        join(arg0: number): void;
        join(arg0: number, arg1: number): void;
        join(): void;
        // static
        dumpStack(): void;
        setDaemon(arg0: boolean): void;
        isDaemon(): boolean;
        checkAccess(): void;
        toString(): string;
        getContextClassLoader(): Java.ClassLoader;
        setContextClassLoader(arg0: Java.ClassLoader): void;
        // static
        holdsLock(arg0: Java.Object): boolean;
        getStackTrace(): Java.StackTraceElement[];
        // static
        getAllStackTraces(): Java.java.util.Map<Java.Thread, Java.StackTraceElement[]>;
        getId(): number;
        getState(): Java.Thread$State;
        // static
        setDefaultUncaughtExceptionHandler(arg0: Java.Thread$UncaughtExceptionHandler): void;
        // static
        getDefaultUncaughtExceptionHandler(): Java.Thread$UncaughtExceptionHandler;
        getUncaughtExceptionHandler(): Java.Thread$UncaughtExceptionHandler;
        setUncaughtExceptionHandler(arg0: Java.Thread$UncaughtExceptionHandler): void;
        
    }
    export interface Exception extends Java.Throwable {
        
    
        
    }
    export interface ClassLoader extends Java.Object {
        
    
        getName(): string;
        loadClass(arg0: string): Java.Class<any>;
        getResource(arg0: string): Java.java.net.URL;
        getResources(arg0: string): Java.java.util.Enumeration<Java.java.net.URL>;
        resources(arg0: string): Java.java.util.stream.Stream<Java.java.net.URL>;
        isRegisteredAsParallelCapable(): boolean;
        // static
        getSystemResource(arg0: string): Java.java.net.URL;
        // static
        getSystemResources(arg0: string): Java.java.util.Enumeration<Java.java.net.URL>;
        getResourceAsStream(arg0: string): Java.java.io.InputStream;
        // static
        getSystemResourceAsStream(arg0: string): Java.java.io.InputStream;
        getParent(): Java.ClassLoader;
        getUnnamedModule(): Java.Module;
        // static
        getPlatformClassLoader(): Java.ClassLoader;
        // static
        getSystemClassLoader(): Java.ClassLoader;
        getDefinedPackage(arg0: string): Java.Package;
        getDefinedPackages(): Java.Package[];
        setDefaultAssertionStatus(arg0: boolean): void;
        setPackageAssertionStatus(arg0: string, arg1: boolean): void;
        setClassAssertionStatus(arg0: string, arg1: boolean): void;
        clearAssertionStatus(): void;
        
    }
    export interface Iterable<T> extends Java.Interface {
        
    
        iterator(): Java.java.util.Iterator<T>;
        forEach(arg0: Java.java.util._function.Consumer<any>): void;
        spliterator(): Java.java.util.Spliterator<T>;
        
    }
    export interface Comparable<T> extends Java.Interface {
        
    
        compareTo(arg0: T): number;
        
    }
    export interface Runnable extends Java.Interface {
        
    
        run(): void;
        
    }
    export interface CharSequence extends Java.Interface {
        
    
        length(): number;
        charAt(arg0: number): number;
        isEmpty(): boolean;
        subSequence(arg0: number, arg1: number): Java.CharSequence;
        toString(): string;
        chars(): Java.java.util.stream.IntStream;
        codePoints(): Java.java.util.stream.IntStream;
        // static
        compare(arg0: Java.CharSequence, arg1: Java.CharSequence): number;
        
    }
    export interface Process extends Java.Object {
        
    
        getOutputStream(): Java.java.io.OutputStream;
        getInputStream(): Java.java.io.InputStream;
        getErrorStream(): Java.java.io.InputStream;
        waitFor(): number;
        waitFor(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): boolean;
        exitValue(): number;
        destroy(): void;
        destroyForcibly(): Java.Process;
        supportsNormalTermination(): boolean;
        isAlive(): boolean;
        pid(): number;
        onExit(): Java.java.util.concurrent.CompletableFuture<Java.Process>;
        toHandle(): Java.ProcessHandle;
        info(): Java.ProcessHandle$Info;
        children(): Java.java.util.stream.Stream<Java.ProcessHandle>;
        descendants(): Java.java.util.stream.Stream<Java.ProcessHandle>;
        
    }
    export interface Enum<E> extends Java.Object, Java.constant.Constable, Java.Comparable<E>, Java.java.io.Serializable {
        
    
        name(): string;
        ordinal(): number;
        toString(): string;
        equals(arg0: Java.Object): boolean;
        hashCode(): number;
        compareTo(arg0: E): number;
        getDeclaringClass(): Java.Class<E>;
        describeConstable(): Java.java.util.Optional<Java.Enum$EnumDesc<E>>;
        // static
        valueOf<T>(arg0: Java.Class<T>, arg1: string): T;
        
    }
    export interface Number extends Java.Object, Java.java.io.Serializable {
        
    
        intValue(): number;
        longValue(): number;
        floatValue(): number;
        doubleValue(): number;
        byteValue(): number;
        shortValue(): number;
        
    }
    export interface RuntimeException extends Java.Exception {
        
    
        
    }
    export interface AutoCloseable extends Java.Interface {
        
    
        close(): void;
        
    }
    export interface Enum$EnumDesc<E> extends Java.constant.DynamicConstantDesc<E> {
        
    
        // static
        of<E>(arg0: Java.constant.ClassDesc, arg1: string): Java.Enum$EnumDesc<E>;
        resolveConstantDesc(arg0: Java.invoke.MethodHandles$Lookup): E;
        toString(): string;
        
    }
    export interface ProcessHandle extends Java.Interface, Java.Comparable<Java.ProcessHandle> {
        
    
        pid(): number;
        // static
        of(arg0: number): Java.java.util.Optional<Java.ProcessHandle>;
        // static
        current(): Java.ProcessHandle;
        parent(): Java.java.util.Optional<Java.ProcessHandle>;
        children(): Java.java.util.stream.Stream<Java.ProcessHandle>;
        descendants(): Java.java.util.stream.Stream<Java.ProcessHandle>;
        // static
        allProcesses(): Java.java.util.stream.Stream<Java.ProcessHandle>;
        info(): Java.ProcessHandle$Info;
        onExit(): Java.java.util.concurrent.CompletableFuture<Java.ProcessHandle>;
        supportsNormalTermination(): boolean;
        destroy(): boolean;
        destroyForcibly(): boolean;
        isAlive(): boolean;
        hashCode(): number;
        equals(arg0: Java.Object): boolean;
        compareTo(arg0: Java.ProcessHandle): number;
        
    }
    export interface ProcessHandle$Info extends Java.Interface {
        
    
        command(): Java.java.util.Optional<string>;
        commandLine(): Java.java.util.Optional<string>;
        arguments(): Java.java.util.Optional<string[]>;
        startInstant(): Java.java.util.Optional<Java.java.time.Instant>;
        totalCpuDuration(): Java.java.util.Optional<Java.java.time.Duration>;
        user(): Java.java.util.Optional<string>;
        
    }
    export interface StringBuffer extends Java.AbstractStringBuilder, Java.java.io.Serializable, Java.Comparable<Java.StringBuffer>, Java.CharSequence {
        
    
        compareTo(arg0: Java.StringBuffer): number;
        length(): number;
        capacity(): number;
        ensureCapacity(arg0: number): void;
        trimToSize(): void;
        setLength(arg0: number): void;
        charAt(arg0: number): number;
        codePointAt(arg0: number): number;
        codePointBefore(arg0: number): number;
        codePointCount(arg0: number, arg1: number): number;
        offsetByCodePoints(arg0: number, arg1: number): number;
        getChars(arg0: number, arg1: number, arg2: number[], arg3: number): void;
        setCharAt(arg0: number, arg1: number): void;
        append(arg0: Java.Object): Java.StringBuffer;
        append(arg0: string): Java.StringBuffer;
        append(arg0: Java.StringBuffer): Java.StringBuffer;
        append(arg0: Java.CharSequence): Java.StringBuffer;
        append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.StringBuffer;
        append(arg0: number[]): Java.StringBuffer;
        append(arg0: number[], arg1: number, arg2: number): Java.StringBuffer;
        append(arg0: boolean): Java.StringBuffer;
        append(arg0: number): Java.StringBuffer;
        append(arg0: number): Java.StringBuffer;
        appendCodePoint(arg0: number): Java.StringBuffer;
        append(arg0: number): Java.StringBuffer;
        append(arg0: number): Java.StringBuffer;
        append(arg0: number): Java.StringBuffer;
        delete(arg0: number, arg1: number): Java.StringBuffer;
        deleteCharAt(arg0: number): Java.StringBuffer;
        replace(arg0: number, arg1: number, arg2: string): Java.StringBuffer;
        substring(arg0: number): string;
        subSequence(arg0: number, arg1: number): Java.CharSequence;
        substring(arg0: number, arg1: number): string;
        insert(arg0: number, arg1: number[], arg2: number, arg3: number): Java.StringBuffer;
        insert(arg0: number, arg1: Java.Object): Java.StringBuffer;
        insert(arg0: number, arg1: string): Java.StringBuffer;
        insert(arg0: number, arg1: number[]): Java.StringBuffer;
        insert(arg0: number, arg1: Java.CharSequence): Java.StringBuffer;
        insert(arg0: number, arg1: Java.CharSequence, arg2: number, arg3: number): Java.StringBuffer;
        insert(arg0: number, arg1: boolean): Java.StringBuffer;
        insert(arg0: number, arg1: number): Java.StringBuffer;
        insert(arg0: number, arg1: number): Java.StringBuffer;
        insert(arg0: number, arg1: number): Java.StringBuffer;
        insert(arg0: number, arg1: number): Java.StringBuffer;
        insert(arg0: number, arg1: number): Java.StringBuffer;
        indexOf(arg0: string): number;
        indexOf(arg0: string, arg1: number): number;
        lastIndexOf(arg0: string): number;
        lastIndexOf(arg0: string, arg1: number): number;
        reverse(): Java.StringBuffer;
        toString(): string;
        
    }
    export interface Cloneable extends Java.Interface {
        
    
        
    }
    export interface ThreadGroup extends Java.Object, Java.Thread$UncaughtExceptionHandler {
        
    
        getName(): string;
        getParent(): Java.ThreadGroup;
        getMaxPriority(): number;
        isDaemon(): boolean;
        isDestroyed(): boolean;
        setDaemon(arg0: boolean): void;
        setMaxPriority(arg0: number): void;
        parentOf(arg0: Java.ThreadGroup): boolean;
        checkAccess(): void;
        activeCount(): number;
        enumerate(arg0: Java.Thread[]): number;
        enumerate(arg0: Java.Thread[], arg1: boolean): number;
        activeGroupCount(): number;
        enumerate(arg0: Java.ThreadGroup[]): number;
        enumerate(arg0: Java.ThreadGroup[], arg1: boolean): number;
        stop(): void;
        interrupt(): void;
        suspend(): void;
        resume(): void;
        destroy(): void;
        list(): void;
        uncaughtException(arg0: Java.Thread, arg1: Java.Throwable): void;
        allowThreadSuspension(arg0: boolean): boolean;
        toString(): string;
        
    }
    export interface Appendable extends Java.Interface {
        
    
        append(arg0: Java.CharSequence): Java.Appendable;
        append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.Appendable;
        append(arg0: number): Java.Appendable;
        
    }
    export interface Package extends Java.NamedPackage, Java.reflect.AnnotatedElement {
        
    
        getName(): string;
        getSpecificationTitle(): string;
        getSpecificationVersion(): string;
        getSpecificationVendor(): string;
        getImplementationTitle(): string;
        getImplementationVersion(): string;
        getImplementationVendor(): string;
        isSealed(): boolean;
        isSealed(arg0: Java.java.net.URL): boolean;
        isCompatibleWith(arg0: string): boolean;
        // static
        getPackage(arg0: string): Java.Package;
        // static
        getPackages(): Java.Package[];
        hashCode(): number;
        toString(): string;
        getAnnotation<A>(arg0: Java.Class<A>): A;
        isAnnotationPresent(arg0: Java.Class<any>): boolean;
        getAnnotationsByType<A>(arg0: Java.Class<A>): A[];
        getAnnotations(): Java.annotation.Annotation[];
        getDeclaredAnnotation<A>(arg0: Java.Class<A>): A;
        getDeclaredAnnotationsByType<A>(arg0: Java.Class<A>): A[];
        getDeclaredAnnotations(): Java.annotation.Annotation[];
        
    }
    export interface Void extends Java.Object {
        // static
        readonly TYPE: Java.Class<Java.Void>;
        
    
        
    }
    export interface Module extends Java.Object, Java.reflect.AnnotatedElement {
        
    
        isNamed(): boolean;
        getName(): string;
        getClassLoader(): Java.ClassLoader;
        getDescriptor(): Java.module.ModuleDescriptor;
        getLayer(): Java.ModuleLayer;
        canRead(arg0: Java.Module): boolean;
        addReads(arg0: Java.Module): Java.Module;
        isExported(arg0: string, arg1: Java.Module): boolean;
        isOpen(arg0: string, arg1: Java.Module): boolean;
        isExported(arg0: string): boolean;
        isOpen(arg0: string): boolean;
        addExports(arg0: string, arg1: Java.Module): Java.Module;
        addOpens(arg0: string, arg1: Java.Module): Java.Module;
        addUses(arg0: Java.Class<any>): Java.Module;
        canUse(arg0: Java.Class<any>): boolean;
        getPackages(): Java.java.util.Set<string>;
        getAnnotation<T>(arg0: Java.Class<T>): T;
        getAnnotations(): Java.annotation.Annotation[];
        getDeclaredAnnotations(): Java.annotation.Annotation[];
        getResourceAsStream(arg0: string): Java.java.io.InputStream;
        toString(): string;
        
    }
    export interface Thread$State extends Java.Enum<Java.Thread$State> {
        // static
        readonly NEW: Java.Thread$State;
        // static
        readonly RUNNABLE: Java.Thread$State;
        // static
        readonly BLOCKED: Java.Thread$State;
        // static
        readonly WAITING: Java.Thread$State;
        // static
        readonly TIMED_WAITING: Java.Thread$State;
        // static
        readonly TERMINATED: Java.Thread$State;
        
    
        // static
        values(): Java.Thread$State[];
        // static
        valueOf(arg0: string): Java.Thread$State;
        
    }
    export interface Readable extends Java.Interface {
        
    
        read(arg0: Java.java.nio.CharBuffer): number;
        
    }
    export interface Thread$UncaughtExceptionHandler extends Java.Interface {
        
    
        uncaughtException(arg0: Java.Thread, arg1: Java.Throwable): void;
        
    }
    export interface NamedPackage extends Java.Object {
        
    
        
    }
    export interface ModuleLayer extends Java.Object {
        
    
        defineModulesWithOneLoader(arg0: Java.module.Configuration, arg1: Java.ClassLoader): Java.ModuleLayer;
        defineModulesWithManyLoaders(arg0: Java.module.Configuration, arg1: Java.ClassLoader): Java.ModuleLayer;
        defineModules(arg0: Java.module.Configuration, arg1: Java.java.util._function.Function<string, Java.ClassLoader>): Java.ModuleLayer;
        // static
        defineModulesWithOneLoader(arg0: Java.module.Configuration, arg1: Java.java.util.List<Java.ModuleLayer>, arg2: Java.ClassLoader): Java.ModuleLayer$Controller;
        // static
        defineModulesWithManyLoaders(arg0: Java.module.Configuration, arg1: Java.java.util.List<Java.ModuleLayer>, arg2: Java.ClassLoader): Java.ModuleLayer$Controller;
        // static
        defineModules(arg0: Java.module.Configuration, arg1: Java.java.util.List<Java.ModuleLayer>, arg2: Java.java.util._function.Function<string, Java.ClassLoader>): Java.ModuleLayer$Controller;
        configuration(): Java.module.Configuration;
        parents(): Java.java.util.List<Java.ModuleLayer>;
        modules(): Java.java.util.Set<Java.Module>;
        findModule(arg0: string): Java.java.util.Optional<Java.Module>;
        findLoader(arg0: string): Java.ClassLoader;
        toString(): string;
        // static
        empty(): Java.ModuleLayer;
        // static
        boot(): Java.ModuleLayer;
        
    }
    export interface AbstractStringBuilder extends Java.Object, Java.Appendable, Java.CharSequence {
        
    
        length(): number;
        capacity(): number;
        ensureCapacity(arg0: number): void;
        trimToSize(): void;
        setLength(arg0: number): void;
        charAt(arg0: number): number;
        codePointAt(arg0: number): number;
        codePointBefore(arg0: number): number;
        codePointCount(arg0: number, arg1: number): number;
        offsetByCodePoints(arg0: number, arg1: number): number;
        getChars(arg0: number, arg1: number, arg2: number[], arg3: number): void;
        setCharAt(arg0: number, arg1: number): void;
        append(arg0: Java.Object): Java.AbstractStringBuilder;
        append(arg0: string): Java.AbstractStringBuilder;
        append(arg0: Java.StringBuffer): Java.AbstractStringBuilder;
        append(arg0: Java.CharSequence): Java.AbstractStringBuilder;
        append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.AbstractStringBuilder;
        append(arg0: number[]): Java.AbstractStringBuilder;
        append(arg0: number[], arg1: number, arg2: number): Java.AbstractStringBuilder;
        append(arg0: boolean): Java.AbstractStringBuilder;
        append(arg0: number): Java.AbstractStringBuilder;
        append(arg0: number): Java.AbstractStringBuilder;
        append(arg0: number): Java.AbstractStringBuilder;
        append(arg0: number): Java.AbstractStringBuilder;
        append(arg0: number): Java.AbstractStringBuilder;
        delete(arg0: number, arg1: number): Java.AbstractStringBuilder;
        appendCodePoint(arg0: number): Java.AbstractStringBuilder;
        deleteCharAt(arg0: number): Java.AbstractStringBuilder;
        replace(arg0: number, arg1: number, arg2: string): Java.AbstractStringBuilder;
        substring(arg0: number): string;
        subSequence(arg0: number, arg1: number): Java.CharSequence;
        substring(arg0: number, arg1: number): string;
        insert(arg0: number, arg1: number[], arg2: number, arg3: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: Java.Object): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: string): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number[]): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: Java.CharSequence): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: Java.CharSequence, arg2: number, arg3: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: boolean): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number): Java.AbstractStringBuilder;
        insert(arg0: number, arg1: number): Java.AbstractStringBuilder;
        indexOf(arg0: string): number;
        indexOf(arg0: string, arg1: number): number;
        lastIndexOf(arg0: string): number;
        lastIndexOf(arg0: string, arg1: number): number;
        reverse(): Java.AbstractStringBuilder;
        toString(): string;
        chars(): Java.java.util.stream.IntStream;
        codePoints(): Java.java.util.stream.IntStream;
        
    }
    export interface ModuleLayer$Controller extends Java.Object {
        
    
        layer(): Java.ModuleLayer;
        addReads(arg0: Java.Module, arg1: Java.Module): Java.ModuleLayer$Controller;
        addExports(arg0: Java.Module, arg1: string, arg2: Java.Module): Java.ModuleLayer$Controller;
        addOpens(arg0: Java.Module, arg1: string, arg2: Java.Module): Java.ModuleLayer$Controller;
        
    }

    export namespace xyz.wagyourtail {
    
        export interface StringHashTrie extends Java.Object, Java.java.util.Collection<string> {
            
        
            size(): number;
            isEmpty(): boolean;
            contains(o: Java.Object): boolean;
            iterator(): Java.java.util.Iterator<string>;
            toArray(): string[];
            toArray<T>(a: T[]): T[];
            add(s: string): boolean;
            
            /**
             * this can make the StringHashTrie sparse, this can cause extra steps in lookup that are no longer needed,
             *  at some point it would be best to rebase the StringHashTrie with `new StringHashTrie().addAll(current.getAll())`
             * @param o
             * @return 
             */
            remove(o: Java.Object): boolean;
            containsAll(c: Java.java.util.Collection<any>): boolean;
            containsAll(o: string[]): boolean;
            addAll(c: Java.java.util.Collection<any>): boolean;
            addAll(o: string[]): boolean;
            removeAll(c: Java.java.util.Collection<any>): boolean;
            removeAll(o: string[]): boolean;
            retainAll(c: Java.java.util.Collection<any>): boolean;
            retainAll(o: string[]): boolean;
            clear(): void;
            
            /**
             * 
             * @param prefix prefix to search with
             * @return all elements that start with the given prefix
             */
            getAllWithPrefix(prefix: string): Java.java.util.Set<string>;
            
            /**
             * 
             * @param prefix prefix to search with
             * @return all elements that start with the given prefix (case insensitive)
             */
            getAllWithPrefixCaseInsensitive(prefix: string): Java.java.util.Set<string>;
            
            /**
             * all contained elements as a {@link Java.Set}
             * @return 
             */
            getAll(): Java.java.util.Set<string>;
            
            /**
             * 
             * @return json representation, mainly for debugging.
             */
            toString(): string;
            
        }
    
        export namespace jsmacros {
        
        
            export namespace core {
            
                export interface MethodWrapper<T, U, R, C> extends Java.Object, Java.java.util._function.Consumer<T>, Java.java.util._function.BiConsumer<T, U>, Java.java.util._function.Function<T, R>, Java.java.util._function.BiFunction<T, U, R>, Java.java.util._function.Predicate<T>, Java.java.util._function.BiPredicate<T, U>, Java.Runnable, Java.java.util._function.Supplier<R>, Java.java.util.Comparator<T> {
                    
                
                    getCtx(): C;
                    accept(t: T): void;
                    accept(t: T, u: U): void;
                    apply(t: T): R;
                    apply(t: T, u: U): R;
                    test(t: T): boolean;
                    test(t: T, u: U): boolean;
                    
                    /**
                     * override to return true if the method can't join to the thread it was wrapped/created in, ie for languages that don't allow multithreading.
                     */
                    preventSameThreadJoin(): boolean;
                    
                    /**
                     * make return something to override the thread set in {@link Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros#on}
                     *  (hi jep)
                     */
                    overrideThread(): Java.Thread;
                    
                    /**
                     * Makes {@link Java.Function} and {@link Java.BiFunction} work together.
                     *  Extended so it's called on every type not just those 2.
                     * @param after put a {@link MethodWrapper} here when using in scripts.
                     */
                    andThen<V>(after: Java.java.util._function.Function<any, any>): Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<T, U, V, C>;
                    
                    /**
                     * Makes {@link Java.Predicate} and {@link Java.BiPredicate} work together
                     */
                    negate(): Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<T, U, R, C>;
                    
                }
            
                export namespace language {
                
                    export interface EventContainer<T> extends Java.Object {
                        
                    
                        isLocked(): boolean;
                        setLockThread(lockThread: Java.Thread): void;
                        getCtx(): Java.xyz.wagyourtail.jsmacros.core.language.BaseScriptContext<T>;
                        getLockThread(): Java.Thread;
                        
                        /**
                         * careful with this one it can cause deadlocks if used in scripts incorrectly.
                         * @param then must be a {@link MethodWrapper} when called from a script.
                         * @throws InterruptedException
                         * @since 1.4.0
                         */
                        awaitLock(then: Java.Runnable): void;
                        
                        /**
                         * can be released earlier in a script or language impl.
                         * @since 1.4.0
                         */
                        releaseLock(): void;
                        toString(): string;
                        
                    }
                    export interface BaseScriptContext<T> extends Java.Object {
                        readonly startTime: number;
                        readonly syncObject: Java.ref.WeakReference<Java.Object>;
                        readonly triggeringEvent: Events.BaseEvent;
                        hasMethodWrapperBeenInvoked: boolean;
                        
                    
                        
                        /**
                         * this object should only be weak referenced unless we want to prevent the context from closing when syncObject is cleared.
                         */
                        getSyncObject(): Java.Object;
                        clearSyncObject(): void;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @return 
                         */
                        getBoundEvents(): Java.java.util.Map<Java.Thread, Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<T>>;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @param th
                         * @param event
                         */
                        bindEvent(th: Java.Thread, event: Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<T>): void;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @param thread
                         * @return 
                         */
                        releaseBoundEventIfPresent(thread: Java.Thread): boolean;
                        getContext(): T;
                        
                        /**
                         * 
                         * @since 1.5.0
                         * @return 
                         */
                        getMainThread(): Java.Thread;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @param t
                         * @return is a newly bound thread
                         */
                        bindThread(t: Java.Thread): boolean;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @param t
                         */
                        unbindThread(t: Java.Thread): void;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @return 
                         */
                        getBoundThreads(): Java.java.util.Set<Java.Thread>;
                        
                        /**
                         * 
                         * @since 1.5.0
                         * @param t
                         */
                        setMainThread(t: Java.Thread): void;
                        
                        /**
                         * 
                         * @since 1.5.0
                         */
                        getTriggeringEvent(): Events.BaseEvent;
                        setContext(context: T): void;
                        isContextClosed(): boolean;
                        closeContext(): void;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @return 
                         */
                        getFile(): Java.java.io.File;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @return 
                         */
                        getContainedFolder(): Java.java.io.File;
                        
                    }
                }
            
                export namespace library.impl {
                
                    export interface FJsMacros$EventAndContext extends Java.Object {
                        readonly event: Events.BaseEvent;
                        readonly context: Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
                        
                    
                        toString(): string;
                        
                    }
                
                    export namespace classes {
                    
                        export interface HTTPRequest extends Java.Object {
                            headers: Java.java.util.Map<string, string>;
                            conn: Java.java.net.URL;
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param key
                             * @param value
                             * @return 
                             */
                            addHeader(key: string, value: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @return 
                             * @throws IOException
                             */
                            get(): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param data
                             * @return 
                             * @throws IOException
                             */
                            post(data: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response;
                            
                        }
                        export interface FileHandler extends Java.Object {
                            
                        
                            
                            /**
                             * writes a string to the file. this is a destructive operation that replaces the file contents.
                             * @since 1.1.8
                             * @param s
                             * @return 
                             * @throws IOException
                             */
                            write(s: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
                            
                            /**
                             * writes a byte array to the file. this is a destructive operation that replaces the file contents.
                             * @since 1.1.8
                             * @param b
                             * @return 
                             * @throws IOException
                             */
                            write(b: number[]): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @return 
                             * @throws IOException
                             */
                            read(): string;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return 
                             * @throws IOException
                             */
                            readBytes(): number[];
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param s
                             * @return 
                             * @throws IOException
                             */
                            append(s: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param b
                             * @return 
                             * @throws IOException
                             */
                            append(b: number[]): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
                            getFile(): Java.java.io.File;
                            toString(): string;
                            
                        }
                        export interface ProxyBuilder<T> extends Java.Object {
                            readonly factory: Java.javassist.util.proxy.ProxyFactory;
                            readonly proxiedMethods: Java.java.util.Map<Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder$MethodSigParts, Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder$ProxyReference<T>, Java.Object[], any, any>>;
                            readonly proxiedMethodDefaults: Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder$ProxyReference<T>, Java.Object[], any, any>>;
                            
                        
                            
                            /**
                             * 
                             * @param methodNameOrSig name of method or sig (the usual format)
                             * @param proxyMethod
                             * @since 1.6.0
                             * @return self for chaining
                             */
                            addMethod(methodNameOrSig: string, proxyMethod: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder$ProxyReference<T>, Java.Object[], any, any>): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder<T>;
                            
                            /**
                             * 
                             * @param constructorArgs args for the super constructor
                             * @since 1.6.0
                             * @return new instance of the constructor
                             * @throws InvocationTargetException
                             * @throws NoSuchMethodException
                             * @throws InstantiationException
                             * @throws IllegalAccessException
                             */
                            buildInstance(constructorArgs: Java.Object[]): T;
                            
                            /**
                             * 
                             * @param constructorSig string signature (you can skip the &lt;init&gt; part)
                             * @param constructorArgs args for the super constructor
                             * @since 1.6.0
                             * @return new instance of the constructor
                             * @throws InvocationTargetException
                             * @throws NoSuchMethodException
                             * @throws InstantiationException
                             * @throws IllegalAccessException
                             * @throws ClassNotFoundException
                             */
                            buildInstance(constructorSig: string, constructorArgs: Java.Object[]): T;
                            
                            /**
                             * 
                             * @param constructorSig string signature (you can skip the &lt;init&gt; part)
                             * @param constructorArgs args for the super constructor
                             * @since 1.6.0
                             * @return new instance of the constructor
                             * @throws InvocationTargetException
                             * @throws NoSuchMethodException
                             * @throws InstantiationException
                             * @throws IllegalAccessException
                             * @throws ClassNotFoundException
                             */
                            buildInstance(constructorSig: Java.Class<any>[], constructorArgs: Java.Object[]): T;
                            
                        }
                        export interface HTTPRequest$Response extends Java.Object {
                            headers: Java.java.util.Map<string, Java.java.util.List<string>>;
                            responseCode: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @return 
                             */
                            text(): string;
                            
                            /**
                             * Don't use this. Parse {@link Java.HTTPRequest.Response#text} in the guest language
                             * @since 1.1.8
                             * @deprecated
                             * @return 
                             */
                            json(): Java.Object;
                            
                            /**
                             * 
                             * @since 1.2.2
                             * @return 
                             * @throws IOException
                             */
                            byteArray(): number[];
                            
                        }
                        export interface Websocket extends Java.Object {
                            
                            /**
                             * calls your method as a {@link Java.java.util._function.Consumer}&lt;{@link Java.WebSocket}, {@link Java.List}&lt;{@link Java.String}&gt;&gt;
                             */
                            onConnect: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.com.neovisionaries.ws.client.WebSocket, Java.java.util.Map<string, Java.java.util.List<string>>, Java.Object, any>;
                            
                            /**
                             * calls your method as a {@link Java.java.util._function.BiConsumer}&lt;{@link Java.WebSocket}, {@link Java.String}&gt;
                             */
                            onTextMessage: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.com.neovisionaries.ws.client.WebSocket, string, Java.Object, any>;
                            
                            /**
                             * calls your method as a {@link Java.java.util._function.BiConsumer}&lt;{@link Java.WebSocket}, {@link Java.Disconnected}&gt;
                             */
                            onDisconnect: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.com.neovisionaries.ws.client.WebSocket, Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket$Disconnected, Java.Object, any>;
                            
                            /**
                             * calls your method as a {@link Java.java.util._function.BiConsumer}&lt;{@link Java.WebSocket}, {@link Java.WebSocketException}&gt;
                             */
                            onError: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.com.neovisionaries.ws.client.WebSocket, Java.com.neovisionaries.ws.client.WebSocketException, Java.Object, any>;
                            
                            /**
                             * calls your method as a {@link Java.java.util._function.BiConsumer}&lt;{@link Java.WebSocket}, {@link Java.WebSocketFrame}&gt;
                             */
                            onFrame: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.com.neovisionaries.ws.client.WebSocket, Java.com.neovisionaries.ws.client.WebSocketFrame, Java.Object, any>;
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return 
                             * @throws WebSocketException
                             */
                            connect(): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return 
                             */
                            getWs(): Java.com.neovisionaries.ws.client.WebSocket;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @param text
                             * @return 
                             */
                            sendText(text: string): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return 
                             */
                            close(): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @param closeCode
                             * @return 
                             */
                            close(closeCode: number): Java.xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket;
                            
                        }
                        export interface Websocket$Disconnected extends Java.Object {
                            serverFrame: Java.com.neovisionaries.ws.client.WebSocketFrame;
                            clientFrame: Java.com.neovisionaries.ws.client.WebSocketFrame;
                            isServer: boolean;
                            
                        
                            
                        }
                        export interface ProxyBuilder$MethodSigParts extends Java.Object {
                            readonly name: string;
                            readonly params: Java.Class<any>[];
                            readonly returnType: Java.Class<any>;
                            
                        
                            equals(o: Java.Object): boolean;
                            hashCode(): number;
                            
                        }
                        export interface ProxyBuilder$ProxyReference<T> extends Java.Object {
                            
                            /**
                             * "this" value, but like python because "this" is a keyword in java...
                             */
                            readonly self: T;
                            
                            /**
                             * "super" value, but that's also a keyword so...
                             */
                            readonly parent: Java.java.util._function.Function<Java.Object[], Java.Object>;
                            
                        
                            
                        }
                    }
                }
            
                export namespace classes {
                
                    export interface Mappings extends Java.Object {
                        readonly mappingsource: string;
                        
                    
                        
                        /**
                         * 
                         * @return mappings from Intermediary to Named
                         * @since 1.3.1
                         * @throws IOException will throw if malformed url/path
                         */
                        getMappings(): Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.core.classes.Mappings$ClassData>;
                        
                        /**
                         * 
                         * @return mappings from Named to Intermediary
                         * @since 1.3.1
                         * @throws IOException will throw if malformed url/path
                         */
                        getReversedMappings(): Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.core.classes.Mappings$ClassData>;
                        
                        /**
                         * 
                         * @since 1.6.0
                         * @return 
                         */
                        remapClass<T>(instance: T): Java.xyz.wagyourtail.jsmacros.core.classes.Mappings$MappedClass<T>;
                        
                        /**
                         * gets the class without instance, so can only access static methods/fields
                         * @param className
                         * @return 
                         * @throws IOException
                         * @throws ClassNotFoundException
                         */
                        getClass(className: string): Java.xyz.wagyourtail.jsmacros.core.classes.Mappings$MappedClass<any>;
                        
                    }
                    export interface WrappedClassInstance<T> extends Java.Object {
                        
                    
                        getFieldValue(fieldName: string): Java.Object;
                        getFieldValueAsClass(asClass: string, fieldName: string): Java.Object;
                        setFieldValue(fieldName: string, fieldValue: Java.Object): void;
                        setFieldValueAsClass(asClass: string, fieldName: string, fieldValue: Java.Object): void;
                        invokeMethod(methodNameOrSig: string, params: Java.Object[]): Java.Object;
                        invokeMethodAsClass(asClass: string, methodNameOrSig: string, params: Java.Object[]): Java.Object;
                        
                        /**
                         * 
                         * @since 1.6.5
                         * @return 
                         */
                        getRawInstance(): T;
                        
                        /**
                         * 
                         * @since 1.6.5
                         * @return 
                         */
                        getRawClass(): Java.Class<T>;
                        
                    }
                    export interface Mappings$MappedClass<T> extends Java.xyz.wagyourtail.jsmacros.core.classes.WrappedClassInstance<T> {
                        
                    
                        
                    }
                    export interface Mappings$ClassData extends Java.Object {
                        readonly methods: Java.java.util.Map<string, Java.xyz.wagyourtail.jsmacros.core.classes.Mappings$MethodData>;
                        readonly fields: Java.java.util.Map<string, string>;
                        readonly name: string;
                        
                    
                        toString(): string;
                        
                    }
                    export interface Mappings$MethodData extends Java.Object {
                        readonly name: string;
                        readonly sig: Java.java.util._function.Supplier<string>;
                        
                    
                        toString(): string;
                        
                    }
                }
            
                export namespace config {
                
                    export interface ConfigManager extends Java.Object {
                        readonly optionClasses: Java.java.util.Map<string, Java.Class<any>>;
                        readonly options: Java.java.util.Map<Java.Class<any>, Java.Object>;
                        readonly configFolder: Java.java.io.File;
                        readonly macroFolder: Java.java.io.File;
                        readonly configFile: Java.java.io.File;
                        readonly LOGGER: Java.org.apache.logging.log4j.Logger;
                        rawOptions: Java.com.google.gson.JsonObject;
                        
                    
                        reloadRawConfigFromFile(): void;
                        convertConfigFormat(): void;
                        convertConfigFormat(clazz: Java.Class<any>): void;
                        getOptions<T>(optionClass: Java.Class<T>): T;
                        addOptions(key: string, optionClass: Java.Class<any>): void;
                        loadConfig(): void;
                        loadDefaults(): void;
                        saveConfig(): void;
                        
                    }
                    export interface BaseProfile extends Java.Object {
                        readonly LOGGER: Java.org.apache.logging.log4j.Logger;
                        readonly joinedThreadStack: Java.java.util.Set<Java.Thread>;
                        profileName: string;
                        
                    
                        logError(ex: Java.Throwable): void;
                        
                        /**
                         * 
                         * @since 1.1.2 [citation needed]
                         * @return 
                         */
                        getRegistry(): Java.xyz.wagyourtail.jsmacros.core.event.BaseEventRegistry;
                        
                        /**
                         * 
                         * @since 1.6.0
                         */
                        checkJoinedThreadStack(): boolean;
                        
                        /**
                         * 
                         * @since 1.1.2 [citation needed]
                         * @param profileName
                         */
                        loadOrCreateProfile(profileName: string): void;
                        
                        /**
                         * 
                         * @since 1.0.8 [citation needed]
                         */
                        saveProfile(): void;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @param event
                         */
                        triggerEvent(event: Events.BaseEvent): void;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @param event
                         */
                        triggerEventJoin(event: Events.BaseEvent): void;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @param event
                         */
                        triggerEventNoAnything(event: Events.BaseEvent): void;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @param event
                         */
                        triggerEventJoinNoAnything(event: Events.BaseEvent): void;
                        init(defaultProfile: string): void;
                        getCurrentProfileName(): string;
                        renameCurrentProfile(profile: string): void;
                        
                    }
                    export interface ScriptTrigger extends Java.Object {
                        triggerType: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        event: string;
                        scriptFile: string;
                        enabled: boolean;
                        
                    
                        equals(macro: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger): boolean;
                        toString(): string;
                        // static
                        copy(m: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger;
                        copy(): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @return 
                         */
                        getTriggerType(): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @return 
                         */
                        getEvent(): string;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @return 
                         */
                        getScriptFile(): string;
                        
                        /**
                         * 
                         * @since 1.2.7
                         * @return 
                         */
                        getEnabled(): boolean;
                        
                    }
                    export interface ScriptTrigger$TriggerType extends Java.Enum<Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType> {
                        // static
                        readonly KEY_FALLING: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        // static
                        readonly KEY_RISING: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        // static
                        readonly KEY_BOTH: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        // static
                        readonly EVENT: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        
                    
                        // static
                        values(): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType[];
                        // static
                        valueOf(name: string): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger$TriggerType;
                        
                    }
                }
            
                export namespace service {
                
                    export interface ServiceManager extends Java.Object {
                        
                    
                        
                        /**
                         * 
                         * @param name
                         * @param pathToFile relative to macro folder
                         * @return false if service with that name is already registered
                         */
                        registerService(name: string, pathToFile: string): boolean;
                        
                        /**
                         * 
                         * @param name
                         * @param pathToFile relative to macro folder
                         * @param enabled
                         * @return false if service with that name is already registered
                         */
                        registerService(name: string, pathToFile: string, enabled: boolean): boolean;
                        
                        /**
                         * 
                         * @param name
                         * @param trigger
                         * @return false if service with that name already registered
                         */
                        registerService(name: string, trigger: Java.xyz.wagyourtail.jsmacros.core.service.ServiceTrigger): boolean;
                        
                        /**
                         * 
                         * @param name
                         * @return 
                         */
                        unregisterService(name: string): boolean;
                        
                        /**
                         * 
                         * @param oldName
                         * @param newName
                         * @return false if service with new name already registered or old name doesn't exist
                         */
                        renameService(oldName: string, newName: string): boolean;
                        
                        /**
                         * 
                         * @return registered service names
                         */
                        getServices(): Java.java.util.Set<string>;
                        
                        /**
                         * starts service once
                         * @param name service name
                         * @return previous state (or {@link ServiceStatus#UNKNOWN} if unknown service)
                         */
                        startService(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                        /**
                         * 
                         * @param name service name
                         * @return previous state (or {@link ServiceStatus#UNKNOWN} if unknown service)
                         */
                        stopService(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                        /**
                         * 
                         * @param name service name
                         * @return state before "restarting" (or {@link ServiceStatus#UNKNOWN} if unknown service)
                         */
                        restartService(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                        /**
                         * 
                         * @param name service name
                         * @return previous state (or {@link ServiceStatus#UNKNOWN} if unknown service)
                         */
                        enableService(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                        /**
                         * 
                         * @param name service name
                         * @return previous state (or {@link ServiceStatus#UNKNOWN} if unknown service)
                         */
                        disableService(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                        /**
                         * 
                         * @param name service name
                         * @return {@link ServiceStatus#UNKNOWN} if unknown service, {@link ServiceStatus#RUNNING} if disabled and running, {@link ServiceStatus#DISABLED} if disabled and stopped, {@link ServiceStatus#STOPPED} if enabled and stopped, {@link ServiceStatus#ENABLED} if enabled and running.
                         */
                        status(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        getServiceData(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceTrigger;
                        
                        /**
                         * load services from config
                         */
                        load(): void;
                        
                        /**
                         * save current registered services & enabled/disabled status to config
                         */
                        save(): void;
                        
                    }
                    export interface ServiceManager$ServiceStatus extends Java.Enum<Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus> {
                        // static
                        readonly ENABLED: Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        // static
                        readonly DISABLED: Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        // static
                        readonly RUNNING: Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        // static
                        readonly STOPPED: Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        // static
                        readonly UNKNOWN: Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                    
                        // static
                        values(): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus[];
                        // static
                        valueOf(name: string): Java.xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus;
                        
                    }
                    export interface ServiceTrigger extends Java.Object {
                        file: string;
                        enabled: boolean;
                        
                    
                        toScriptTrigger(): Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger;
                        equals(o: Java.Object): boolean;
                        hashCode(): number;
                        
                    }
                }
            
                export namespace event {
                
                    export interface IEventListener extends Java.Interface {
                        
                    
                        trigger(event: Events.BaseEvent): Java.xyz.wagyourtail.jsmacros.core.language.EventContainer<any>;
                        
                    }
                    export interface BaseEventRegistry extends Java.Object {
                        readonly oldEvents: Java.java.util.Map<string, string>;
                        readonly events: Java.java.util.Set<string>;
                        
                    
                        clearMacros(): void;
                        
                        /**
                         * 
                         * @since 1.1.2 [citation needed]
                         * @param rawmacro
                         */
                        addScriptTrigger(rawmacro: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger): void;
                        
                        /**
                         * 
                         * @since 1.2.3
                         * @param event
                         * @param listener
                         */
                        addListener(event: string, listener: Java.xyz.wagyourtail.jsmacros.core.event.IEventListener): void;
                        
                        /**
                         * 
                         * @since 1.2.3
                         * @param event
                         * @param listener
                         * @return 
                         */
                        removeListener(event: string, listener: Java.xyz.wagyourtail.jsmacros.core.event.IEventListener): boolean;
                        
                        /**
                         * 
                         * @since 1.2.3
                         * @param listener
                         * @return 
                         */
                        removeListener(listener: Java.xyz.wagyourtail.jsmacros.core.event.IEventListener): boolean;
                        
                        /**
                         * 
                         * @since 1.1.2 [citation needed]
                         * @param rawmacro
                         * @return 
                         */
                        removeScriptTrigger(rawmacro: Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger): boolean;
                        
                        /**
                         * 
                         * @since 1.2.3
                         * @return 
                         */
                        getListeners(): Java.java.util.Map<string, Java.java.util.Set<Java.xyz.wagyourtail.jsmacros.core.event.IEventListener>>;
                        
                        /**
                         * 
                         * @since 1.2.3
                         * @param key
                         * @return 
                         */
                        getListeners(key: string): Java.java.util.Set<Java.xyz.wagyourtail.jsmacros.core.event.IEventListener>;
                        
                        /**
                         * 
                         * @see ScriptTrigger
                         * @since 1.1.2 [citation needed]
                         * @return 
                         */
                        getScriptTriggers(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.core.config.ScriptTrigger>;
                        
                        /**
                         * 
                         * @since 1.1.2 [citation needed]
                         * @param eventName
                         */
                        addEvent(eventName: string): void;
                        addEvent(clazz: Java.Class<any>): void;
                        
                    }
                
                    export namespace impl {
                    
                        export interface EventCustom extends Java.Object, Events.BaseEvent {
                            eventName: string;
                            
                        
                            
                            /**
                             * Triggers the event.
                             *  Try not to cause infinite looping by triggering the same {@link Java.EventCustom} from its own listeners.
                             * @since 1.2.8
                             */
                            trigger(): void;
                            
                            /**
                             * trigger the event listeners, then run `callback` when they finish.
                             * @since 1.3.1
                             * @param callback used as a {@link Runnable}, so no args, no return value.
                             */
                            trigger(callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>): void;
                            
                            /**
                             * Triggers the event and waits for it to complete.
                             *  In languages with threading issues (js/jep) this may cause circular waiting when triggered from the same thread as
                             *  the `jsmacros.on` registration for the event
                             * @since 1.2.8
                             */
                            triggerJoin(): void;
                            
                            /**
                             * Put an Integer into the event.
                             * @param name
                             * @param i
                             * @return 
                             * @since 1.2.8
                             */
                            putInt(name: string, i: number): number;
                            
                            /**
                             * put a String into the event.
                             * @param name
                             * @param str
                             * @return 
                             * @since 1.2.8
                             */
                            putString(name: string, str: string): string;
                            
                            /**
                             * put a Double into the event.
                             * @param name
                             * @param d
                             * @return 
                             * @since 1.2.8
                             */
                            putDouble(name: string, d: number): number;
                            
                            /**
                             * put a Boolean into the event.
                             * @param name
                             * @param b
                             * @return 
                             * @since 1.2.8
                             */
                            putBoolean(name: string, b: boolean): boolean;
                            
                            /**
                             * put anything else into the event.
                             * @param name
                             * @param o
                             * @return 
                             * @since 1.2.8
                             */
                            putObject(name: string, o: Java.Object): Java.Object;
                            
                            /**
                             * Returns the type of the defined item in the event as a string.
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getType(name: string): string;
                            
                            /**
                             * Gets an Integer from the event.
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getInt(name: string): number;
                            
                            /**
                             * Gets a String from the event
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getString(name: string): string;
                            
                            /**
                             * Gets a Double from the event.
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getDouble(name: string): number;
                            
                            /**
                             * Gets a Boolean from the event.
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getBoolean(name: string): boolean;
                            
                            /**
                             * Gets an Object from the event.
                             * @param name
                             * @return 
                             * @since 1.2.8
                             */
                            getObject(name: string): Java.Object;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @return map backing the event
                             */
                            getUnderlyingMap(): Java.java.util.Map<string, Java.Object>;
                            
                            /**
                             * registers event so you can see it in the gui
                             * @since 1.3.0
                             */
                            registerEvent(): void;
                            
                        }
                    }
                }
            
                export namespace helpers {
                
                    export interface BaseHelper<T> extends Java.Object {
                        
                    
                        getRaw(): T;
                        
                    }
                }
            }
        
            export namespace client {
            
            
                export namespace gui {
                
                
                    export namespace editor {
                    
                        export interface History extends Java.Object {
                            onChange: Java.java.util._function.Consumer<string>;
                            current: string;
                            
                        
                            
                            /**
                             * 
                             * @param position
                             * @param content
                             * @return is new step.
                             */
                            addChar(position: number, content: number): boolean;
                            add(position: number, content: string): boolean;
                            
                            /**
                             * 
                             * @param position
                             * @return is new step.
                             */
                            deletePos(position: number, length: number): boolean;
                            
                            /**
                             * 
                             * @param position
                             * @return is new step
                             */
                            bkspacePos(position: number, length: number): boolean;
                            shiftLine(startLine: number, lines: number, shiftDown: boolean): boolean;
                            replace(position: number, length: number, content: string): void;
                            tabLines(startLine: number, lineCount: number, reverse: boolean): void;
                            
                            /**
                             * 
                             * @return position of step. -1 if nothing to undo.
                             */
                            undo(): number;
                            
                            /**
                             * 
                             * @return position of step. -1 if nothing to redo.
                             */
                            redo(): number;
                            
                        }
                        export interface SelectCursor extends Java.Object {
                            onChange: Java.java.util._function.Consumer<Java.xyz.wagyourtail.jsmacros.client.gui.editor.SelectCursor>;
                            defaultStyle: /* minecraft classes, as any, because obfuscation: */ any;
                            startLine: number;
                            endLine: number;
                            startIndex: number;
                            endIndex: number;
                            startLineIndex: number;
                            endLineIndex: number;
                            dragStartIndex: number;
                            arrowLineIndex: number;
                            arrowEnd: boolean;
                            startCol: number;
                            endCol: number;
                            
                        
                            updateStartIndex(startIndex: number, current: string): void;
                            updateEndIndex(endIndex: number, current: string): void;
                            
                        }
                    
                        export namespace highlighting {
                        
                            export interface AutoCompleteSuggestion extends Java.Object {
                                readonly startIndex: number;
                                readonly suggestion: string;
                                readonly displayText: /* minecraft classes, as any, because obfuscation: */ any;
                                
                            
                                
                            }
                            export interface AbstractRenderCodeCompiler extends Java.Object {
                                
                            
                                recompileRenderedText(text: string): void;
                                getRightClickOptions(index: number): Java.java.util.Map<string, Java.Runnable>;
                                getRenderedText(): /* minecraft classes, as any, because obfuscation: */ any[];
                                getSuggestions(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AutoCompleteSuggestion>;
                                
                            }
                        }
                    }
                
                    export namespace screens {
                    
                        export interface EditorScreen extends Java.xyz.wagyourtail.wagyourgui.BaseScreen {
                            // static
                            readonly langs: Java.java.util.List<string>;
                            // static
                            defaultStyle: /* minecraft classes, as any, because obfuscation: */ any;
                            readonly history: Java.xyz.wagyourtail.jsmacros.client.gui.editor.History;
                            readonly cursor: Java.xyz.wagyourtail.jsmacros.client.gui.editor.SelectCursor;
                            blockFirst: boolean;
                            textRenderTime: number;
                            prevChar: number;
                            language: string;
                            codeCompiler: Java.xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AbstractRenderCodeCompiler;
                            
                        
                            getDefaultLanguage(): string;
                            // static
                            openAndScrollToIndex(file: Java.java.io.File, startIndex: number, endIndex: number): void;
                            // static
                            openAndScrollToLine(file: Java.java.io.File, line: number, col: number, endCol: number): void;
                            setScroll(pages: number): void;
                            setLanguage(language: string): void;
                            init(): void;
                            copyToClipboard(): void;
                            pasteFromClipboard(): void;
                            cutToClipboard(): void;
                            keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
                            scrollToCursor(): void;
                            save(): void;
                            needSave(): boolean;
                            mouseScrolled(mouseX: number, mouseY: number, amount: number): boolean;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            openParent(): void;
                            mouseClicked(mouseX: number, mouseY: number, btn: number): boolean;
                            selectWordAtCursor(): void;
                            mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
                            updateSettings(): void;
                            charTyped(chr: number, keyCode: number): boolean;
                            
                        }
                    }
                }
            
                export namespace api {
                
                
                    export namespace helpers {
                    
                        export interface PlayerListEntryHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return 
                             */
                            getUUID(): string;
                            
                            /**
                             * 
                             * @since 1.0.2
                             * @return 
                             */
                            getName(): string;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getPing(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return null if unknown
                             */
                            getGamemode(): string;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return 
                             */
                            getDisplayText(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            toString(): string;
                            
                        }
                        export interface BlockDataHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return the {@code x} value of the block.
                             */
                            getX(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return the {@code y} value of the block.
                             */
                            getY(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return the {@code z} value of the block.
                             */
                            getZ(): number;
                            
                            /**
                             * 
                             * @return the item ID of the block.
                             */
                            getId(): string;
                            
                            /**
                             * 
                             * @return the translated name of the block.
                             */
                            getName(): string;
                            
                            /**
                             * 
                             * @return 
                             * @since 1.5.1, used to be a {@link Map}&lt;{@link String}, {@link String}&gt;
                             */
                            getNBT(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @return 
                             * @since 1.6.5
                             */
                            getBlockStateHelper(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper;
                            
                            /**
                             * 
                             * @return 
                             * @since 1.6.5
                             */
                            getBlockHelper(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockHelper;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return block state data as a {@link Map}.
                             */
                            getBlockState(): Java.java.util.Map<string, string>;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the block pos.
                             */
                            getBlockPos(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            getRawBlock(): /* minecraft classes, as any, because obfuscation: */ any;
                            getRawBlockState(): /* minecraft classes, as any, because obfuscation: */ any;
                            getRawBlockEntity(): /* minecraft classes, as any, because obfuscation: */ any;
                            toString(): string;
                            
                        }
                        export interface OptionsHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return 0: off, 2: fancy
                             */
                            getCloudMode(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @param mode 0: off, 2: fancy
                             * @return 
                             */
                            setCloudMode(mode: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return 
                             */
                            getGraphicsMode(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @param mode 0: fast, 2: fabulous
                             * @return 
                             */
                            setGraphicsMode(mode: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return list of names of resource packs.
                             */
                            getResourcePacks(): Java.java.util.List<string>;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @return list of names of enabled resource packs.
                             */
                            getEnabledResourcePacks(): Java.java.util.List<string>;
                            
                            /**
                             * Set the enabled resource packs to the provided list.
                             * @since 1.2.0
                             * @param enabled
                             * @return 
                             */
                            setEnabledResourcePacks(enabled: string[]): Java.xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return 
                             */
                            isRightHanded(): boolean;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @param val
                             */
                            setRightHanded(val: boolean): void;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return 
                             */
                            getFov(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @param fov
                             * @return 
                             */
                            setFov(fov: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @return 
                             */
                            getRenderDistance(): number;
                            
                            /**
                             * 
                             * @since 1.1.7
                             * @param d
                             */
                            setRenderDistance(d: number): void;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return 
                             */
                            getWidth(): number;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return 
                             */
                            getHeight(): number;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param w
                             */
                            setWidth(w: number): void;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param h
                             */
                            setHeight(h: number): void;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param w
                             * @param h
                             */
                            setSize(w: number, h: number): void;
                            
                            /**
                             * 
                             * @since 1.3.0
                             *  normal values for gamam are between {@code 0} and {@code 1}
                             */
                            getGamma(): number;
                            
                            /**
                             * 
                             * @since 1.3.0
                             *  normal values for gamma are between {@code 0} and {@code 1}
                             */
                            setGamma(gamma: number): void;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @param vol
                             */
                            setVolume(vol: number): void;
                            
                            /**
                             * set volume by category.
                             * @since 1.3.1
                             * @param category
                             * @param volume
                             */
                            setVolume(category: string, volume: number): void;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return 
                             */
                            getVolumes(): Java.java.util.Map<string, number>;
                            
                            /**
                             * sets gui scale, `0` for auto.
                             * @since 1.3.1
                             * @param scale
                             */
                            setGuiScale(scale: number): void;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return gui scale, {@code 0} for auto.
                             */
                            getGuiScale(): number;
                            
                            /**
                             * 
                             * @param category
                             * @since 1.3.1
                             * @return 
                             */
                            getVolume(category: string): number;
                            
                            /**
                             * 
                             * @since 1.5.0
                             * @return 
                             */
                            getSmoothCamera(): boolean;
                            
                            /**
                             * 
                             * @param val
                             * @since 1.5.0
                             */
                            setSmoothCamera(val: boolean): void;
                            
                            /**
                             * 
                             * @since 1.5.0
                             * @return 0 for 1st person, 2 for in front.
                             */
                            getCameraMode(): number;
                            
                            /**
                             * 
                             * @param mode 0: first, 2: front
                             * @since 1.5.0
                             */
                            setCameraMode(mode: number): void;
                            
                        }
                        export interface PlayerEntityHelper<T> extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.LivingEntityHelper<T> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @see xyz.wagyourtail.jsmacros.client.api.helpers.PlayerAbilitiesHelper
                             * @return 
                             */
                            getAbilities(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerAbilitiesHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getMainHand(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getOffHand(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getHeadArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getChestArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getLegArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            getFootArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.5 [citation needed]
                             * @return 
                             */
                            getXP(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getXPLevel(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getXPProgress(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getXPToLevelUp(): number;
                            
                            /**
                             * 
                             * @since 1.2.5 [citation needed]
                             * @return 
                             */
                            isSleeping(): boolean;
                            
                            /**
                             * 
                             * @since 1.2.5 [citation needed]
                             * @return if the player has slept the minimum ammount of time to pass the night.
                             */
                            isSleepingLongEnough(): boolean;
                            toString(): string;
                            
                        }
                        export interface CommandContextHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper<Java.com.mojang.brigadier.context.CommandContext<any>>, Events.BaseEvent {
                            
                        
                            
                            /**
                             * 
                             * @param name
                             * @return 
                             * @since 1.4.2
                             * @throws CommandSyntaxException
                             */
                            getArg(name: string): Java.Object;
                            getChild(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.CommandContextHelper;
                            getRange(): Java.com.mojang.brigadier.context.StringRange;
                            getInput(): string;
                            
                        }
                        export interface BlockStateHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @return a map of the state properties with its identifier and value.
                             * @version 1.6.5
                             */
                            toMap(): Java.java.util.Map<string, string>;
                            
                            /**
                             * 
                             * @return the block the state belongs to.
                             * @version 1.6.5
                             */
                            getBlock(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockHelper;
                            
                            /**
                             * 
                             * @return the hardness.
                             * @version 1.6.5
                             */
                            getHardness(): number;
                            
                            /**
                             * 
                             * @return the luminance.
                             * @version 1.6.5
                             */
                            getLuminance(): number;
                            
                            /**
                             * 
                             * @return {@code true} if the state emits redstone power.
                             * @version 1.6.5
                             */
                            emitsRedstonePower(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the shape of the state is a cube.
                             * @version 1.6.5
                             */
                            exceedsCube(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state is air.
                             * @version 1.6.5
                             */
                            isAir(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state is opaque.
                             * @version 1.6.5
                             */
                            isOpaque(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if a tool is required to mine the block.
                             * @version 1.6.5
                             */
                            isToolRequired(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state has a block entity.
                             * @version 1.6.5
                             */
                            hasBlockEntity(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state can be random ticked.
                             * @version 1.6.5
                             */
                            hasRandomTicks(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state has a comparator output.
                             * @version 1.6.5
                             */
                            hasComparatorOutput(): boolean;
                            
                            /**
                             * 
                             * @return the piston behaviour of the state.
                             * @version 1.6.5
                             */
                            getPistonBehaviour(): string;
                            
                            /**
                             * 
                             * @return {@code true} if the state blocks light.
                             * @version 1.6.5
                             */
                            blocksLight(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state blocks the movement of entities.
                             * @version 1.6.5
                             */
                            blocksMovement(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state is burnable.
                             * @version 1.6.5
                             */
                            isBurnable(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state is a liquid.
                             * @version 1.6.5* @version 1.6.5
                             */
                            isLiquid(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the state is solid.
                             * @version 1.6.5* @version 1.6.5
                             */
                            isSolid(): boolean;
                            
                            /**
                             * This will return true for blocks like air and grass, that can be replaced
                             *  without breaking them first.
                             * @return {@code true} if the state can be replaced.
                             * @version 1.6.5
                             */
                            isReplaceable(): boolean;
                            
                            /**
                             * 
                             * @param pos
                             * @param entity
                             * @return {@code true} if the entity can spawn on this block state at the given position in the current world.
                             * @version 1.6.5
                             */
                            allowsSpawning(pos: Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper, entity: string): boolean;
                            
                            /**
                             * 
                             * @param pos
                             * @return {@code true} if an entity can suffocate in this block state at the given position in the current world.
                             * @version 1.6.5
                             */
                            shouldSuffocate(pos: Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper): boolean;
                            toString(): string;
                            
                        }
                        export interface BlockHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @return the default state of the block.
                             * @version 1.6.5
                             */
                            getDefaultState(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper;
                            
                            /**
                             * 
                             * @return the default item stack of the block.
                             * @version 1.6.5
                             */
                            getDefaultItemStack(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            canMobSpawnInside(): boolean;
                            
                            /**
                             * 
                             * @return {@code true} if the block has dynamic bounds.
                             * @version 1.6.5
                             */
                            hasDynamicBounds(): boolean;
                            
                            /**
                             * 
                             * @return the blast resistance.
                             * @version 1.6.5
                             */
                            getBlastResistance(): number;
                            
                            /**
                             * 
                             * @return the jump velocity multiplier.
                             * @version 1.6.5
                             */
                            getJumpVelocityMultiplier(): number;
                            
                            /**
                             * 
                             * @return the slipperiness.
                             * @version 1.6.5
                             */
                            getSlipperiness(): number;
                            
                            /**
                             * 
                             * @return the hardness.
                             * @version 1.6.5
                             */
                            getHardness(): number;
                            
                            /**
                             * 
                             * @return the velocity multiplier.
                             * @version 1.6.5
                             */
                            getVelocityMultiplier(): number;
                            
                            /**
                             * 
                             * @return all tags of the block as an {@link java.util.ArrayList ArrayList}.
                             * @version 1.6.5
                             */
                            getTags(): Java.java.util.List<string>;
                            
                            /**
                             * 
                             * @return all possible block states of the block.
                             * @version 1.6.5
                             */
                            getStates(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockStateHelper>;
                            
                            /**
                             * 
                             * @return the identifier of the block.
                             * @version 1.6.5
                             */
                            getId(): string;
                            toString(): string;
                            
                        }
                        export interface EntityHelper<T> extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper<T> {
                            
                        
                            
                            /**
                             * 
                             * @return entity position.
                             */
                            getPos(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * 
                             * @return entity block position.
                             * @since 1.6.5
                             */
                            getBlockPos(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * 
                             * @return entity chunk coordinates. Since Pos2D only has x and y fields, z coord is y.
                             * @since 1.6.5
                             */
                            getChunkPos(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @return the {@code x} value of the entity.
                             */
                            getX(): number;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @return the {@code y} value of the entity.
                             */
                            getY(): number;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @return the {@code z} value of the entity.
                             */
                            getZ(): number;
                            
                            /**
                             * 
                             * @since 1.2.8
                             * @return the current eye height offset for the entitye.
                             */
                            getEyeHeight(): number;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @return the {@code pitch} value of the entity.
                             */
                            getPitch(): number;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @return the {@code yaw} value of the entity.
                             */
                            getYaw(): number;
                            
                            /**
                             * 
                             * @return the name of the entity.
                             * @since 1.0.8 [citation needed], returned string until 1.6.4
                             */
                            getName(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @return the type of the entity.
                             */
                            getType(): string;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return if the entity has the glowing effect.
                             */
                            isGlowing(): boolean;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return if the entity is in lava.
                             */
                            isInLava(): boolean;
                            
                            /**
                             * 
                             * @since 1.1.9
                             * @return if the entity is on fire.
                             */
                            isOnFire(): boolean;
                            
                            /**
                             * 
                             * @since 1.1.8 [citation needed]
                             * @return the vehicle of the entity.
                             */
                            getVehicle(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.1.8 [citation needed]
                             * @return the entity passengers.
                             */
                            getPassengers(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>>;
                            
                            /**
                             * 
                             * @since 1.2.8, was a {@link String} until 1.5.0
                             * @return 
                             */
                            getNBT(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param name
                             */
                            setCustomName(name: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): void;
                            
                            /**
                             * 
                             * @param color
                             */
                            setGlowingColor(color: number): void;
                            
                            /**
                             * 
                             */
                            resetGlowingColor(): void;
                            
                            /**
                             * Sets whether the entity is glowing.
                             * @since 1.1.9
                             * @param val
                             * @return 
                             */
                            setGlowing(val: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<T>;
                            
                            /**
                             * reset the glowing effect to proper value.
                             * @since 1.6.3
                             * @return 
                             */
                            resetGlowing(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<T>;
                            
                            /**
                             * Checks if the entity is still alive.
                             * @since 1.2.8
                             * @return 
                             */
                            isAlive(): boolean;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return UUID of the entity, random* if not a player, otherwise the player's uuid.
                             */
                            getUUID(): string;
                            toString(): string;
                            
                            /**
                             * mostly for internal use.
                             * @param e mc entity.
                             * @return correct subclass of this. * 
                             * static
                             */
                            create(e: /* minecraft classes, as any, because obfuscation: */ any): Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asClientPlayer(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asPlayer(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerEntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asVillager(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.VillagerEntityHelper;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asMerchant(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.MerchantEntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asLiving(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.LivingEntityHelper<any>;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return cast of this entity helper (mainly for typescript)
                             */
                            asItem(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemEntityHelper;
                            
                        }
                        export interface ItemStackHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * Sets the item damage value.
                             *  
                             *  You may want to use {@link Java.ItemStackHelper#copy} first.
                             * @since 1.2.0
                             * @param damage
                             * @return 
                             */
                            setDamage(damage: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @return 
                             */
                            isDamageable(): boolean;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @return 
                             */
                            isEnchantable(): boolean;
                            
                            /**
                             * 
                             * @return 
                             */
                            getDamage(): number;
                            
                            /**
                             * 
                             * @return 
                             */
                            getMaxDamage(): number;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @return 
                             */
                            getDefaultName(): string;
                            
                            /**
                             * 
                             * @return 
                             */
                            getName(): string;
                            
                            /**
                             * 
                             * @return 
                             */
                            getCount(): number;
                            
                            /**
                             * 
                             * @return 
                             */
                            getMaxCount(): number;
                            
                            /**
                             * 
                             * @since 1.1.6, was a {@link String} until 1.5.1
                             * @return 
                             */
                            getNBT(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @since 1.1.3
                             * @return 
                             */
                            getCreativeTab(): string;
                            
                            /**
                             * 
                             * @return 
                             */
                            getItemID(): string;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @return 
                             */
                            getItemId(): string;
                            
                            /**
                             * 
                             * @return 
                             */
                            isEmpty(): boolean;
                            toString(): string;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param ish
                             * @return 
                             */
                            equals(ish: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param is
                             * @return 
                             */
                            equals(is: /* minecraft classes, as any, because obfuscation: */ any): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param ish
                             * @return 
                             */
                            isItemEqual(ish: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param is
                             * @return 
                             */
                            isItemEqual(is: /* minecraft classes, as any, because obfuscation: */ any): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param ish
                             * @return 
                             */
                            isItemEqualIgnoreDamage(ish: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param is
                             * @return 
                             */
                            isItemEqualIgnoreDamage(is: /* minecraft classes, as any, because obfuscation: */ any): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param ish
                             * @return 
                             */
                            isNBTEqual(ish: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): boolean;
                            
                            /**
                             * 
                             * @since 1.1.3 [citation needed]
                             * @param is
                             * @return 
                             */
                            isNBTEqual(is: /* minecraft classes, as any, because obfuscation: */ any): boolean;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            isOnCooldown(): boolean;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getCooldownProgress(): number;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @return 
                             */
                            copy(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                        }
                        export interface BlockPosHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return the {@code x} value of the block.
                             */
                            getX(): number;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return the {@code y} value of the block.
                             */
                            getY(): number;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @return the {@code z} value of the block.
                             */
                            getZ(): number;
                            
                            /**
                             * 
                             * @return the block above.
                             * @since 1.6.5
                             */
                            up(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the block n-th block above.
                             * @since 1.6.5
                             */
                            up(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @return the block below.
                             * @since 1.6.5
                             */
                            down(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the block n-th block below.
                             * @since 1.6.5
                             */
                            down(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @return the block to the north.
                             * @since 1.6.5
                             */
                            north(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the n-th block to the north.
                             * @since 1.6.5
                             */
                            north(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @return the block to the south.
                             * @since 1.6.5
                             */
                            south(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the n-th block to the south.
                             * @since 1.6.5
                             */
                            south(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @return the block to the east.
                             * @since 1.6.5
                             */
                            east(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the n-th block to the east.
                             * @since 1.6.5
                             */
                            east(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @return the block to the west.
                             * @since 1.6.5
                             */
                            west(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param distance
                             * @return the n-th block to the west.
                             * @since 1.6.5
                             */
                            west(distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param direction
                             * @return the block offset by the given direction.
                             * @since 1.6.5
                             */
                            offset(direction: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            
                            /**
                             * 
                             * @param direction
                             * @param distance
                             * @return the n-th block offset by the given direction.
                             * @since 1.6.5
                             */
                            offset(direction: string, distance: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.BlockPosHelper;
                            toString(): string;
                            
                        }
                        export interface BossBarHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.1
                             * @return boss bar uuid.
                             */
                            getUUID(): string;
                            
                            /**
                             * 
                             * @since 1.2.1
                             * @return percent of boss bar remaining.
                             */
                            getPercent(): number;
                            
                            /**
                             * 
                             * @since 1.2.1
                             * @return boss bar color.
                             */
                            getColor(): string;
                            
                            /**
                             * 
                             * @since 1.2.1
                             * @return boss bar notch style.
                             */
                            getStyle(): string;
                            
                            /**
                             * 
                             * @since 1.2.1
                             * @return name of boss bar
                             */
                            getName(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            toString(): string;
                            
                        }
                        export interface TextHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * replace the text in this class with JSON data.
                             * @since 1.0.8
                             * @param json
                             * @return 
                             */
                            replaceFromJson(json: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * replace the text in this class with {@link Java.String} data.
                             * @since 1.0.8
                             * @param content
                             * @return 
                             */
                            replaceFromString(content: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return JSON data representation.
                             */
                            getJson(): string;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the text content.
                             */
                            getString(): string;
                            
                            /**
                             * 
                             * @param visitor function with 2 args, no return.
                             * @since 1.6.5
                             */
                            visit(visitor: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.StyleHelper, string, Java.Object, any>): void;
                            
                            /**
                             * 
                             * @since 1.0.8
                             * @deprecated confusing name.
                             * @return 
                             */
                            toJson(): string;
                            
                            /**
                             * 
                             * @since 1.0.8, this used to do the same as {@link #getString}
                             * @return String representation of text helper.
                             */
                            toString(): string;
                            
                        }
                        export interface ClientPlayerEntityHelper<T> extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerEntityHelper<T> {
                            
                        
                            
                            /**
                             * 
                             * @param yaw (was pitch prior to 1.2.6)
                             * @param pitch (was yaw prior to 1.2.6)
                             * @return 
                             * @since 1.0.3
                             */
                            lookAt(yaw: number, pitch: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * look at the specified coordinates.
                             * @param x
                             * @param y
                             * @param z
                             * @return 
                             * @since 1.2.8
                             */
                            lookAt(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param entity
                             * @since 1.5.0
                             */
                            attack(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param await
                             * @param entity
                             */
                            attack(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param direction 0-5 in order: [DOWN, UP, NORTH, SOUTH, WEST, EAST];
                             * @since 1.5.0
                             */
                            attack(x: number, y: number, z: number, direction: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param x
                             * @param y
                             * @param z
                             * @param direction 0-5 in order: [DOWN, UP, NORTH, SOUTH, WEST, EAST];
                             * @param await
                             * @throws InterruptedException
                             */
                            attack(x: number, y: number, z: number, direction: number, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param entity
                             * @param offHand
                             * @since 1.5.0, renamed from {@code interact} in 1.6.0
                             */
                            interactEntity(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>, offHand: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param entity
                             * @param offHand
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            interactEntity(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<any>, offHand: boolean, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param offHand
                             * @since 1.5.0, renamed from {@code interact} in 1.6.0
                             */
                            interactItem(offHand: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param offHand
                             * @param await
                             */
                            interactItem(offHand: boolean, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param direction
                             * @param offHand
                             * @since 1.5.0, renamed from {@code interact} in 1.6.0
                             */
                            interactBlock(x: number, y: number, z: number, direction: number, offHand: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            interactBlock(x: number, y: number, z: number, direction: number, offHand: boolean, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.5.0
                             */
                            interact(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param await
                             */
                            interact(await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.5.0
                             */
                            attack(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param await
                             */
                            attack(await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param stop
                             * @since 1.6.3
                             * @return 
                             */
                            setLongAttack(stop: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @param stop
                             * @since 1.6.3
                             * @return 
                             */
                            setLongInteract(stop: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ClientPlayerEntityHelper<T>;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getItemCooldownsRemainingTicks(): Java.java.util.Map<string, number>;
                            
                            /**
                             * 
                             * @param item
                             * @since 1.6.5
                             * @return 
                             */
                            getItemCooldownRemainingTicks(item: string): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            getTicksSinceCooldownsStart(): Java.java.util.Map<string, number>;
                            
                            /**
                             * 
                             * @param item
                             * @since 1.6.5
                             * @return 
                             */
                            getTicksSinceCooldownStart(item: string): number;
                            
                            /**
                             * 
                             * @return 
                             * @since 1.1.2
                             */
                            getFoodLevel(): number;
                            toString(): string;
                            
                        }
                        export interface ScoreboardsHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @param index
                             * @since 1.2.9
                             * @return 
                             */
                            getObjectiveForTeamColorIndex(index: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ScoreboardObjectiveHelper;
                            
                            /**
                             * `0` is tab list, `1` or `3 + getPlayerTeamColorIndex()` is sidebar, `2` should be below name.
                             *  therefore max slot number is 18.
                             * @param slot
                             * @since 1.2.9
                             * @return 
                             */
                            getObjectiveSlot(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ScoreboardObjectiveHelper;
                            
                            /**
                             * 
                             * @param entity
                             * @since 1.2.9
                             * @return 
                             */
                            getPlayerTeamColorIndex(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerEntityHelper</* minecraft classes, as any, because obfuscation: */ any>): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return team index for client player
                             */
                            getPlayerTeamColorIndex(): number;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getTeams(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TeamHelper>;
                            
                            /**
                             * 
                             * @param p
                             * @since 1.3.0
                             * @return 
                             */
                            getPlayerTeam(p: Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerEntityHelper</* minecraft classes, as any, because obfuscation: */ any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TeamHelper;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return team for client player
                             */
                            getPlayerTeam(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TeamHelper;
                            
                            /**
                             * 
                             * @since 1.2.9
                             * @return the {@link ScoreboardObjectiveHelper} for the currently displayed sidebar scoreboard.
                             */
                            getCurrentScoreboard(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ScoreboardObjectiveHelper;
                            toString(): string;
                            
                        }
                        export interface TeamHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getName(): string;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getDisplayName(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getPlayerList(): Java.java.util.List<string>;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getColor(): number;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getPrefix(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getSuffix(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            getCollisionRule(): string;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            isFriendlyFire(): boolean;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            showFriendlyInvisibles(): boolean;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            nametagVisibility(): string;
                            
                            /**
                             * 
                             * @since 1.3.0
                             * @return 
                             */
                            deathMessageVisibility(): string;
                            toString(): string;
                            
                        }
                        export interface ScoreboardObjectiveHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @return player name to score map
                             */
                            getPlayerScores(): Java.java.util.Map<string, number>;
                            
                            /**
                             * 
                             * @return name of scoreboard
                             * @since 1.2.9
                             */
                            getName(): string;
                            
                            /**
                             * 
                             * @return name of scoreboard
                             * @since 1.2.9
                             */
                            getDisplayName(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                        }
                        export interface NBTElementHelper<T> extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper<T> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            getType(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            isNull(): boolean;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            isNumber(): boolean;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            isString(): boolean;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            isList(): boolean;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            isCompound(): boolean;
                            
                            /**
                             * if element is a string, returns value.
                             *  otherwise returns toString representation.
                             * @since 1.5.1
                             */
                            asString(): string;
                            
                            /**
                             * check with {@link #isNumber} first
                             * @since 1.5.1
                             */
                            asNumberHelper(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTNumberHelper;
                            
                            /**
                             * check with {@link #isList} first
                             * @since 1.5.1
                             */
                            asListHelper(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTListHelper;
                            
                            /**
                             * check with {@link #isCompound} first
                             * @since 1.5.1
                             */
                            asCompoundHelper(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTCompoundHelper;
                            toString(): string;
                            
                            /**
                             * 
                             * @since 1.5.1 * 
                             * static
                             */
                            resolve(element: /* minecraft classes, as any, because obfuscation: */ any): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                        }
                        export interface LivingEntityHelper<T> extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper<T> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return entity status effects.
                             */
                            getStatusEffects(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.StatusEffectHelper>;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @see xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper
                             * @return the item in the entity's main hand.
                             */
                            getMainHand(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the item in the entity's off hand.
                             */
                            getOffHand(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the item in the entity's head armor slot.
                             */
                            getHeadArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the item in the entity's chest armor slot.
                             */
                            getChestArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the item in the entity's leg armor slot.
                             */
                            getLegArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return the item in the entity's foot armor slot.
                             */
                            getFootArmor(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return entity's health
                             */
                            getHealth(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return entity's max health
                             */
                            getMaxHealth(): number;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return if the entity is in a bed.
                             */
                            isSleeping(): boolean;
                            
                            /**
                             * 
                             * @since 1.5.0
                             * @return if the entity has elytra deployed
                             */
                            isFallFlying(): boolean;
                            
                        }
                        export interface VillagerEntityHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.MerchantEntityHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return 
                             */
                            getProfession(): string;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return 
                             */
                            getStyle(): string;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @return 
                             */
                            getLevel(): number;
                            toString(): string;
                            
                        }
                        export interface StyleHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            hasColor(): boolean;
                            getColor(): number;
                            hasCustomColor(): boolean;
                            getCustomColor(): number;
                            bold(): boolean;
                            italic(): boolean;
                            underlined(): boolean;
                            strikethrough(): boolean;
                            obfuscated(): boolean;
                            getClickAction(): string;
                            getClickValue(): string;
                            getCustomClickValue(): Java.Runnable;
                            getHoverAction(): string;
                            getHoverValue(): Java.Object;
                            getInsertion(): string;
                            toString(): string;
                            
                        }
                        export interface ItemEntityHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            getContainedItemStack(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            toString(): string;
                            
                        }
                        export interface PlayerAbilitiesHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @return whether the player can be damaged.
                             */
                            getInvulnerable(): boolean;
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @return if the player is currently flying.
                             */
                            getFlying(): boolean;
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @return if the player is allowed to fly.
                             */
                            getAllowFlying(): boolean;
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @return if the player is in creative.
                             */
                            getCreativeMode(): boolean;
                            
                            /**
                             * set the player flying state.
                             * @since 1.0.3
                             * @param b
                             * @return 
                             */
                            setFlying(b: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerAbilitiesHelper;
                            
                            /**
                             * set the player allow flying state.
                             * @since 1.0.3
                             * @param b
                             * @return 
                             */
                            setAllowFlying(b: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerAbilitiesHelper;
                            
                            /**
                             * 
                             * @since 1.0.3
                             * @return the player fly speed multiplier.
                             */
                            getFlySpeed(): number;
                            
                            /**
                             * set the player fly speed multiplier.
                             * @since 1.0.3
                             * @param flySpeed
                             * @return 
                             */
                            setFlySpeed(flySpeed: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.PlayerAbilitiesHelper;
                            
                        }
                        export interface MerchantEntityHelper<T> extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.LivingEntityHelper<T> {
                            
                        
                            
                            /**
                             * these might not work... depends on the data the server sends, maybe just singleplayer.
                             * @return 
                             */
                            getTrades(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TradeOfferHelper>;
                            refreshTrades(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TradeOfferHelper>;
                            
                            /**
                             * 
                             * @return 
                             */
                            getExperience(): number;
                            
                            /**
                             * 
                             * @return 
                             */
                            hasCustomer(): boolean;
                            toString(): string;
                            
                        }
                        export interface NBTElementHelper$NBTCompoundHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @return 
                             */
                            getKeys(): Java.java.util.Set<string>;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            getType(key: string): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            has(key: string): boolean;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            get(key: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asString(key: string): string;
                            
                        }
                        export interface TradeOfferHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @return list of input items required
                             */
                            getInput(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper>;
                            
                            /**
                             * 
                             * @return output item that will be recieved
                             */
                            getOutput(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * select trade offer on screen
                             */
                            select(): void;
                            
                            /**
                             * 
                             * @return 
                             */
                            isAvailable(): boolean;
                            
                            /**
                             * 
                             * @return trade offer as nbt tag
                             */
                            getNBT(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @return current number of uses
                             */
                            getUses(): number;
                            
                            /**
                             * 
                             * @return max uses before it locks
                             */
                            getMaxUses(): number;
                            
                            /**
                             * 
                             * @return experience gained for trade
                             */
                            getExperience(): number;
                            
                            /**
                             * 
                             * @return current price adjustment, negative is discount.
                             */
                            getCurrentPriceAdjustment(): number;
                            toString(): string;
                            
                        }
                        export interface NBTElementHelper$NBTListHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.5.1
                             * @return 
                             */
                            length(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            get(index: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            getHeldType(): number;
                            
                        }
                        export interface StatusEffectHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.4
                             * @return 
                             */
                            getId(): string;
                            
                            /**
                             * 
                             * @since 1.2.4
                             * @return 
                             */
                            getStrength(): number;
                            
                            /**
                             * 
                             * @since 1.2.4
                             * @return 
                             */
                            getTime(): number;
                            
                        }
                        export interface NBTElementHelper$NBTNumberHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asLong(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asInt(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asShort(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asByte(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asFloat(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asDouble(): number;
                            
                            /**
                             * 
                             * @since 1.5.1
                             */
                            asNumber(): Java.Number;
                            
                        }
                        export interface SuggestionsBuilderHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper<Java.com.mojang.brigadier.suggestion.SuggestionsBuilder> {
                            
                        
                            getInput(): string;
                            getStart(): number;
                            getRemaining(): string;
                            getRemainingLowerCase(): string;
                            suggest(suggestion: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper;
                            suggest(value: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper;
                            suggestWithTooltip(suggestion: string, tooltip: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper;
                            suggestWithTooltip(value: number, tooltip: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper;
                            
                        }
                        export interface ChatHudLineHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            getText(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            getId(): number;
                            getCreationTick(): number;
                            deleteById(): void;
                            
                        }
                        export interface RecipeHelper extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return 
                             */
                            getId(): string;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return 
                             */
                            getOutput(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @param craftAll
                             */
                            craft(craftAll: boolean): void;
                            toString(): string;
                            
                        }
                        export interface ButtonWidgetHelper<T> extends Java.xyz.wagyourtail.jsmacros.core.helpers.BaseHelper<T>, Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement {
                            zIndex: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return the {@code x} coordinate of the button.
                             */
                            getX(): number;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return the {@code y} coordinate of the button.
                             */
                            getY(): number;
                            
                            /**
                             * Set the button position.
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @return 
                             */
                            setPos(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return 
                             */
                            getWidth(): number;
                            
                            /**
                             * change the text.
                             * @since 1.0.5, renamed from {@code setText} in 1.3.1
                             * @deprecated only deprecated in buttonWidgetHelper for confusing name.
                             * @param label
                             * @return 
                             */
                            setLabel(label: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * change the text.
                             * @since 1.3.1
                             * @param helper
                             * @return 
                             */
                            setLabel(helper: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * 
                             * @since 1.2.3, renamed fro {@code getText} in 1.3.1
                             * @return current button text.
                             */
                            getLabel(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return button clickable state.
                             */
                            getActive(): boolean;
                            
                            /**
                             * set the button clickable state.
                             * @since 1.0.5
                             * @param t
                             * @return 
                             */
                            setActive(t: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * set the button width.
                             * @since 1.0.5
                             * @param width
                             * @return 
                             */
                            setWidth(width: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * clicks button
                             * @since 1.3.1
                             */
                            click(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            
                            /**
                             * clicks button
                             * @param await should wait for button to finish clicking.
                             * @since 1.3.1
                             */
                            click(await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<T>;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getZIndex(): number;
                            
                        }
                        export interface TextFieldWidgetHelper extends Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper</* minecraft classes, as any, because obfuscation: */ any> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return the currently entered {@link java.lang.String String}.
                             */
                            getText(): string;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param text
                             * @return 
                             */
                            setText(text: string): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * set the currently entered {@link Java.String}.
                             * @param text
                             * @param await
                             * @return 
                             * @since 1.3.1
                             * @throws InterruptedException
                             */
                            setText(text: string, await: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param color
                             * @return 
                             */
                            setEditableColor(color: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param edit
                             * @return 
                             */
                            setEditable(edit: boolean): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param color
                             * @return 
                             */
                            setUneditableColor(color: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                        }
                    }
                
                    export namespace classes {
                    
                        export interface WorldScanner extends Java.Object {
                            
                        
                            
                            /**
                             * Gets a list of all chunks in the given range around the center chunk.
                             * @param centerX
                             * @param centerZ
                             * @param chunkrange
                             * @return 
                             */
                            getChunkRange(centerX: number, centerZ: number, chunkrange: number): Java.java.util.List</* minecraft classes, as any, because obfuscation: */ any>;
                            
                            /**
                             * Scans all chunks in the given range around the player and returns a list of all block positions, for blocks matching the filter.
                             *  This will scan in a square with length 2*range + 1. So range = 0 for example will only scan the chunk the player
                             *  is standing in, while range = 1 will scan in a 3x3 area.
                             * @param range
                             * @return 
                             */
                            scanAroundPlayer(range: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
                            
                            /**
                             * Scans all chunks in the given range around the center chunk and returns a list of all block positions, for blocks matching the filter.
                             *  This will scan in a square with length 2*range + 1. So range = 0 for example will only scan the specified chunk,
                             *  while range = 1 will scan in a 3x3 area.
                             * @param centerX
                             * @param centerZ
                             * @param chunkrange
                             * @return the list
                             */
                            scanChunkRange(centerX: number, centerZ: number, chunkrange: number): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D>;
                            
                            /**
                             * Gets the amount of all blocks matching the criteria inside the chunk.
                             * @param chunkX
                             * @param chunkZ
                             * @param ignoreState whether multiple states should be combined to a single block
                             * @return 
                             */
                            getBlocksInChunk(chunkX: number, chunkZ: number, ignoreState: boolean): Java.java.util.Map<string, number>;
                            
                            /**
                             * Gets the amount of all blocks matching the criteria inside square around the center chunk 
                             *  with radius chunkrange/2.
                             * @param centerX
                             * @param centerZ
                             * @param chunkrange
                             * @param ignoreState whether multiple states should be combined to a single block
                             * @return 
                             */
                            getBlocksInChunks(centerX: number, centerZ: number, chunkrange: number, ignoreState: boolean): Java.java.util.Map<string, number>;
                            
                            /**
                             * Get the amount of cached block states. This will normally be around 200 - 400.
                             * @return 
                             */
                            getCachedAmount(): number;
                            
                        }
                        export interface WorldScannerBuilder extends Java.Object {
                            
                        
                            withStateFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            andStateFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            orStateFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            notStateFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            withBlockFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            andBlockFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            orBlockFilter(method: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            notBlockFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            withStringBlockFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            andStringBlockFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            orStringBlockFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            withStringStateFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            andStringStateFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            orStringStateFilter(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            is(args: Java.Object[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            is(methodArgs: Java.Object[], filterArgs: Java.Object[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            test(args: Java.Object[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            test(methodArgs: Java.Object[], filterArgs: Java.Object[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            equals(args: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            contains(args: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            startsWith(args: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            endsWith(args: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            matches(args: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScannerBuilder;
                            build(): Java.xyz.wagyourtail.jsmacros.client.api.classes.WorldScanner;
                            
                        }
                        export interface TextBuilder extends Java.Object {
                            
                        
                            
                            /**
                             * move on to next section and set it's text.
                             * @param text a {@link String}, {@link TextHelper} or {@link TextBuilder}
                             * @since 1.3.0
                             * @return 
                             */
                            append(text: Java.Object): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * set current section's color by color code as hex, like `0x6` for gold
                             *  and `0xc` for red.
                             * @param color
                             * @since 1.3.0
                             * @return 
                             */
                            withColor(color: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * Add text with custom colors.
                             * @since 1.3.1
                             * @param r red {@code 0-255}
                             * @param g green {@code 0-255}
                             * @param b blue {@code 0-255}
                             * @return 
                             */
                            withColor(r: number, g: number, b: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * set other formatting options for the current section
                             * @param underline
                             * @param bold
                             * @param italic
                             * @param strikethrough
                             * @param magic
                             * @since 1.3.0
                             * @return 
                             */
                            withFormatting(underline: boolean, bold: boolean, italic: boolean, strikethrough: boolean, magic: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * set current section's hover event to show text
                             * @param text
                             * @since 1.3.0
                             * @return 
                             */
                            withShowTextHover(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * set current section's hover event to show an item
                             * @param item
                             * @since 1.3.0
                             * @return 
                             */
                            withShowItemHover(item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * set current section's hover event to show an entity
                             * @param entity
                             * @since 1.3.0
                             * @return 
                             */
                            withShowEntityHover(entity: Java.xyz.wagyourtail.jsmacros.client.api.helpers.EntityHelper</* minecraft classes, as any, because obfuscation: */ any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * custom click event.
                             * @param action
                             * @since 1.3.0
                             * @return 
                             */
                            withCustomClickEvent(action: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.Object, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * normal click events like: `open_url`, `open_file`, `run_command`, `suggest_command`, `change_page`, and `copy_to_clipboard`
                             * @param action
                             * @param value
                             * @since 1.3.0
                             * @return 
                             */
                            withClickEvent(action: string, value: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder;
                            
                            /**
                             * Build to a {@link Java.TextHelper}
                             * @since 1.3.0
                             * @return 
                             */
                            build(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                        }
                        export interface ChatHistoryManager extends Java.Object {
                            
                        
                            
                            /**
                             * 
                             * @param index
                             * @since 1.6.0
                             * @return 
                             */
                            getRecvLine(index: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ChatHudLineHelper;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param index
                             * @param line
                             */
                            insertRecvText(index: number, line: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): void;
                            
                            /**
                             * you should probably run {@link #refreshVisible} after...
                             * @param index
                             * @param line
                             * @param timeTicks
                             * @since 1.6.0
                             */
                            insertRecvText(index: number, line: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, timeTicks: number): void;
                            
                            /**
                             * 
                             * @param index
                             * @param line
                             * @param timeTicks
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            insertRecvText(index: number, line: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, timeTicks: number, await: boolean): void;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param index
                             */
                            removeRecvText(index: number): void;
                            
                            /**
                             * 
                             * @param index
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            removeRecvText(index: number, await: boolean): void;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param text
                             */
                            removeRecvTextMatching(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): void;
                            
                            /**
                             * 
                             * @param text
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            removeRecvTextMatching(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, await: boolean): void;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @param filter
                             */
                            removeRecvTextMatchingFilter(filter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ChatHudLineHelper, Java.Object, boolean, any>): void;
                            
                            /**
                             * 
                             * @param filter
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            removeRecvTextMatchingFilter(filter: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ChatHudLineHelper, Java.Object, boolean, any>, await: boolean): void;
                            
                            /**
                             * this will reset the view of visible messages
                             * @since 1.6.0
                             */
                            refreshVisible(): void;
                            
                            /**
                             * 
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            refreshVisible(await: boolean): void;
                            
                            /**
                             * 
                             * @since 1.6.0
                             */
                            clearRecv(): void;
                            
                            /**
                             * 
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            clearRecv(await: boolean): void;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @return direct reference to sent message history list. modifications will affect the list.
                             */
                            getSent(): Java.java.util.List<string>;
                            
                            /**
                             * 
                             * @since 1.6.0
                             */
                            clearSent(): void;
                            
                            /**
                             * 
                             * @param await
                             * @since 1.6.0
                             * @throws InterruptedException
                             */
                            clearSent(await: boolean): void;
                            
                        }
                        export interface ScriptScreen extends Java.xyz.wagyourtail.wagyourgui.BaseScreen {
                            
                        
                            
                            /**
                             * 
                             * @param parent parent screen to go to when this one exits.
                             * @since 1.4.0
                             */
                            setParent(parent: Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen): void;
                            
                            /**
                             * add custom stuff to the render function on the main thread.
                             * @param onRender pos3d elements are mousex, mousey, tickDelta
                             * @since 1.4.0
                             */
                            setOnRender(onRender: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D, /* minecraft classes, as any, because obfuscation: */ any, Java.Object, any>): void;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            onClose(): void;
                            
                        }
                        export interface PlayerInput extends Java.Object {
                            movementForward: number;
                            movementSideways: number;
                            yaw: number;
                            pitch: number;
                            jumping: boolean;
                            sneaking: boolean;
                            sprinting: boolean;
                            
                        
                            
                            /**
                             * Parses each row of CSV string into a `PlayerInput`.
                             *  The capitalization of the header matters.<br>
                             *  About the columns:
                             *  <ul>
                             *    <li> `movementForward` and `movementSideways` as a number</li>
                             *    <li>`yaw` and `pitch` as an absolute number</li>
                             *    <li>`jumping`, `sneaking` and `sprinting` have to be boolean</li>
                             *  </ul>
                             *  <p>
                             *  The separation must be a "," it's a csv...(but spaces don't matter)<br>
                             *  Quoted values don't work
                             * @param csv CSV string to be parsed
                             * @return {@code List<PlayerInput>} Each row parsed as a {@code PlayerInput}
                             * @see #PlayerInput(float, float, float, float, boolean, boolean, boolean)
                             * @since 1.4.0 * 
                             * static
                             */
                            fromCsv(csv: string): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput>;
                            
                            /**
                             * Parses a JSON string into a `PlayerInput` Object
                             *  For details see `PlayerInput.fromCsv()`, on what has to be present.<br>
                             *  Capitalization of the keys matters.
                             * @param json JSON string to be parsed
                             * @return The JSON parsed into a {@code PlayerInput}
                             * @see #fromCsv(String)
                             * @since 1.4.0 * 
                             * static
                             */
                            fromJson(json: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
                            
                            /**
                             * Converts the current object into a string.
                             *  This can be used to convert current inputs created using `Player.getCurrentPlayerInput()`
                             *  to either JSON or CSV.
                             *  <p>
                             *  The output can be converted into a PlayerInput object again by using either
                             *  `fromCsv(String, String)` or `fromJson(String)`.
                             * @param varNames whether to include variable Names(=JSON) or not(=CSV)
                             * @return The {@code PlayerInput} object as a string
                             * @since 1.4.0
                             */
                            toString(varNames: boolean): string;
                            toString(): string;
                            clone(): Java.xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput;
                            
                        }
                        export interface Draw3D extends Java.Object {
                            
                        
                            
                            /**
                             * 
                             * @return 
                             * @since 1.0.6
                             */
                            getBoxes(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box>;
                            
                            /**
                             * 
                             * @return 
                             * @since 1.0.6
                             */
                            getLines(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line>;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param fillColor
                             * @param fill
                             * @return The {@link Box} you added.
                             * @since 1.0.6
                             */
                            addBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, fillColor: number, fill: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param fillColor
                             * @param fill
                             * @param cull
                             * @return 
                             * @since 1.3.1
                             */
                            addBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, fillColor: number, fill: boolean, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param alpha
                             * @param fillColor
                             * @param fillAlpha
                             * @param fill
                             * @return the {@link Box} you added.
                             * @since 1.1.8
                             */
                            addBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, alpha: number, fillColor: number, fillAlpha: number, fill: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            addBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, alpha: number, fillColor: number, fillAlpha: number, fill: boolean, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * 
                             * @param b
                             * @return 
                             * @since 1.0.6
                             */
                            removeBox(b: Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @return the {@link Line} you added.
                             * @since 1.0.6
                             */
                            addLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param cull
                             * @return 
                             * @since 1.3.1
                             */
                            addLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param alpha
                             * @return the {@link Line} you added.
                             * @since 1.1.8
                             */
                            addLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line;
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @param color
                             * @param alpha
                             * @param cull
                             * @return 
                             * @since 1.3.1
                             */
                            addLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: number, alpha: number, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line;
                            
                            /**
                             * 
                             * @param l
                             * @return 
                             * @since 1.0.6
                             */
                            removeLine(l: Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Line): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D;
                            
                            /**
                             * Draws a cube({@link Java.Box}) with a specific radius(`side length = 2*radius`)
                             * @param point the center point
                             * @param radius 1/2 of the side length of the cube
                             * @param color point color
                             * @return the {@link Box} generated, and visualized
                             * @see Draw3D.Box
                             * @since 1.4.0
                             */
                            addPoint(point: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D, radius: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * Draws a cube({@link Java.Box}) with a specific radius(`side length = 2*radius`)
                             * @param x x value of the center point
                             * @param y y value of the center point
                             * @param z z value of the center point
                             * @param radius 1/2 of the side length of the cube
                             * @param color point color
                             * @return the {@link Box} generated, and visualized
                             * @see Draw3D.Box
                             * @since 1.4.0
                             */
                            addPoint(x: number, y: number, z: number, radius: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * Draws a cube({@link Java.Box}) with a specific radius(`side length = 2*radius`)
                             * @param x x value of the center point
                             * @param y y value of the center point
                             * @param z z value of the center point
                             * @param radius 1/2 of the side length of the cube
                             * @param color point color
                             * @param alpha alpha of the point
                             * @param cull whether to cull the point or not
                             * @return the {@link Box} generated, and visualized
                             * @see Draw3D.Box
                             * @since 1.4.0
                             */
                            addPoint(x: number, y: number, z: number, radius: number, color: number, alpha: number, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Box;
                            
                            /**
                             * 
                             * @param x top left
                             * @param y
                             * @param z
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param width
                             * @param height
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, width: number, height: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param xRot
                             * @param yRot
                             * @param zRot
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param xRot
                             * @param yRot
                             * @param zRot
                             * @param width
                             * @param height
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, width: number, height: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param xRot
                             * @param yRot
                             * @param zRot
                             * @param width
                             * @param height
                             * @param minSubdivisions
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, width: number, height: number, minSubdivisions: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param z
                             * @param xRot
                             * @param yRot
                             * @param zRot
                             * @param width
                             * @param height
                             * @param minSubdivisions
                             * @param renderBack
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, width: number, height: number, minSubdivisions: number, renderBack: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * 
                             * @param x top left
                             * @param y
                             * @param z
                             * @param xRot
                             * @param yRot
                             * @param zRot
                             * @param width
                             * @param height
                             * @param minSubdivisions
                             * @param renderBack
                             * @since 1.6.5
                             * @return 
                             */
                            addDraw2D(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, width: number, height: number, minSubdivisions: number, renderBack: boolean, cull: boolean): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D$Surface;
                            
                            /**
                             * register so it actually shows up
                             * @return self for chaining
                             * @since 1.6.5
                             */
                            register(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D;
                            
                            /**
                             * 
                             * @return self for chaining
                             * @since 1.6.5
                             */
                            unregister(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw3D;
                            render(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            
                        }
                        export interface Draw2D extends /* supressed minecraft class */ Java.Object, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D> {
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @deprecated please use {@link Draw2D#setOnInit(MethodWrapper)}
                             */
                            onInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D, Java.Object, Java.Object, any>;
                            
                            /**
                             * 
                             * @since 1.1.9 [citation needed]
                             * @deprecated please use {@link Draw2D#setOnFailInit(MethodWrapper)}
                             */
                            catchInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<string, Java.Object, Java.Object, any>;
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#getWidth()
                             */
                            getWidth(): number;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#getHeight()
                             */
                            getHeight(): number;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#getTexts()
                             */
                            getTexts(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text>;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#getRects()
                             */
                            getRects(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect>;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#getItems()
                             */
                            getItems(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item>;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @see IDraw2D#getImages()
                             */
                            getImages(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image>;
                            getElements(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement>;
                            removeElement(e: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            reAddElement(e: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#addText(String, int, int, int, boolean)
                             */
                            addText(text: string, x: number, y: number, color: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: string, x: number, y: number, color: number, zIndex: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @see IDraw2D#addText(String, int, int, int, boolean, double, double)
                             */
                            addText(text: string, x: number, y: number, color: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: string, x: number, y: number, color: number, zIndex: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, zIndex: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, zIndex: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#removeText(xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon.Text)
                             */
                            removeText(t: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @see IDraw2D#addImage(int, int, int, int, String, int, int, int, int, int, int)
                             */
                            addImage(x: number, y: number, width: number, height: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @see IDraw2D#addImage(int, int, int, int, String, int, int, int, int, int, int, double)
                             */
                            addImage(x: number, y: number, width: number, height: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @see IDraw2D#addImage(int, int, int, int, int, String, int, int, int, int, int, int, double)
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @see IDraw2D#addImage(int, int, int, int, int, int, String, int, int, int, int, int, int, double)
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, color: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @see IDraw2D#addImage(int, int, int, int, int, int, int, String, int, int, int, int, int, int, double)
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, alpha: number, color: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @see IDraw2D#removeImage(xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon.Image)
                             */
                            removeImage(i: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#addRect(int, int, int, int, int)
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @see IDraw2D#addRect(int, int, int, int, int, int)
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @see IDraw2D#addRect(int, int, int, int, int, int, double)
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, rotation: number, zIndex: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#removeRect(xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon.Rect)
                             */
                            removeRect(r: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#addItem(int, int, String)
                             */
                            addItem(x: number, y: number, id: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, id: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @see IDraw2D#addItem(int, int, String, boolean)
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, id: string, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @see IDraw2D#addItem(int, int, String, boolean, double, double)
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, id: string, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#addItem(int, int, ItemStackHelper)
                             */
                            addItem(x: number, y: number, Item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @see IDraw2D#addItem(int, int, ItemStackHelper, boolean)
                             */
                            addItem(x: number, y: number, Item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @see IDraw2D#addItem(int, int, ItemStackHelper, boolean, double, double)
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @see IDraw2D#removeItem(xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon.Item)
                             */
                            removeItem(i: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            init(): void;
                            render(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            
                            /**
                             * init function, called when window is resized or screen/draw2d is registered.
                             *  clears all previous elements when called.
                             * @since 1.2.7
                             * @see IDraw2D#setOnInit(MethodWrapper)
                             * @param onInit calls your method as a {@link java.util.function.Consumer Consumer}&lt;{@link Draw2D}&gt;
                             */
                            setOnInit(onInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @see IDraw2D#setOnFailInit(MethodWrapper)
                             * @param catchInit calls your method as a {@link java.util.function.Consumer Consumer}&lt;{@link java.lang.String String}&gt;
                             */
                            setOnFailInit(catchInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<string, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * register so the overlay actually renders
                             * @since 1.6.5
                             * @return self for chaining
                             */
                            register(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                            /**
                             * register so the overlay actually renders
                             * @since 1.6.5
                             * @return self for chaining
                             */
                            unregister(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D;
                            
                        }
                        export interface CommandBuilder extends Java.Object {
                            
                            /**
                             * name -> builder * 
                             * static
                             */
                            createNewBuilder: Java.java.util._function.Function<string, Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder>;
                            
                        
                            literalArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            angleArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            blockArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            booleanArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            colorArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            doubleArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            doubleArg(name: string, min: number, max: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            floatRangeArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            longArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            longArg(name: string, min: number, max: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            identifierArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            intArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            intArg(name: string, min: number, max: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            intRangeArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            itemArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            nbtArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            greedyStringArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            quotedStringArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            wordArg(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            textArgType(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            uuidArgType(name: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            regexArgType(name: string, regex: string, flags: string): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * it is recomended to use {@link Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros#runScript}
                             *  in the callback if you expect to actually do anything complicated with waits.
                             * 
                             *  the {@link Java.CommandContextHelper} arg is an {@link Java.BaseEvent}
                             *  so you can pass it directly to {@link Java.xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros#runScript}.
                             * 
                             *  make sure your callback returns a boolean success = true.
                             * @param callback
                             * @return 
                             */
                            executes(callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.CommandContextHelper, Java.Object, boolean, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @param suggestions
                             * @return 
                             */
                            suggestMatching(suggestions: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @param suggestions
                             * @return 
                             */
                            suggestIdentifier(suggestions: string[]): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @param callback
                             * @return 
                             */
                            suggest(callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.CommandContextHelper, Java.xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            or(): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * name overload for {@link #or} to work around language keyword restrictions
                             * @since 1.5.2
                             * @return 
                             */
                            otherwise(): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            or(argumentLevel: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            
                            /**
                             * name overload for {@link #or} to work around language keyword restrictions
                             * @since 1.5.2
                             * @param argLevel
                             * @return 
                             */
                            otherwise(argLevel: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.CommandBuilder;
                            register(): void;
                            
                        }
                        export interface Inventory<T> extends Java.Object {
                            
                        
                            // static
                            create(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<any>;
                            // static
                            create(s: /* minecraft classes, as any, because obfuscation: */ any): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<any>;
                            
                            /**
                             * 
                             * @param slot
                             * @since 1.5.0
                             * @return 
                             */
                            click(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * Clicks a slot with a mouse button.
                             * @since 1.0.8
                             * @param slot
                             * @param mousebutton
                             * @return 
                             */
                            click(slot: number, mousebutton: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * Does a drag-click with a mouse button. (the slots don't have to be in order or even adjacent, but when vanilla minecraft calls the underlying function they're always sorted...)
                             * @param slots
                             * @param mousebutton
                             * @return 
                             */
                            dragClick(slots: number[], mousebutton: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * 
                             * @since 1.5.0
                             * @param slot
                             */
                            dropSlot(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * 
                             * @since 1.2.5
                             * @return the index of the selected hotbar slot.
                             */
                            getSelectedHotbarSlotIndex(): number;
                            
                            /**
                             * 
                             * @since 1.2.5
                             * @param index
                             */
                            setSelectedHotbarSlotIndex(index: number): void;
                            
                            /**
                             * closes the inventory, (if the inventory/container is visible it will close the gui). also drops any "held on mouse" items.
                             * @return 
                             */
                            closeAndDrop(): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * Closes the inventory, and open gui if applicable.
                             */
                            close(): void;
                            
                            /**
                             * simulates a shift-click on a slot.
                             *  It should be safe to chain these without {@link Java.FClient#waitTick} at least for a bunch of the same item.
                             * @param slot
                             * @return 
                             */
                            quick(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * 
                             * @return the held (by the mouse) item.
                             */
                            getHeld(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @param slot
                             * @return the item in the slot.
                             */
                            getSlot(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            
                            /**
                             * 
                             * @return the size of the container/inventory.
                             */
                            getTotalSlots(): number;
                            
                            /**
                             * Splits the held stack into two slots. can be alternatively done with {@link Java.Inventory#dragClick} if this one has issues on some servers.
                             * @param slot1
                             * @param slot2
                             * @return 
                             * @throws Exception
                             */
                            split(slot1: number, slot2: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * Does that double click thingy to turn a incomplete stack pickup into a complete stack pickup if you have more in your inventory.
                             * @param slot
                             * @return 
                             */
                            grabAll(slot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * swaps the items in two slots.
                             * @param slot1
                             * @param slot2
                             * @return 
                             */
                            swap(slot1: number, slot2: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * equivelent to hitting the numbers or f for swapping slots to hotbar
                             * @param slot
                             * @param hotbarSlot 0-8 or 40 for offhand
                             * @return 
                             */
                            swapHotbar(slot: number, hotbarSlot: number): Java.xyz.wagyourtail.jsmacros.client.api.classes.Inventory<T>;
                            
                            /**
                             * 
                             * @since 1.2.8
                             */
                            openGui(): void;
                            
                            /**
                             * 
                             * @since 1.1.3
                             * @return the id of the slot under the mouse.
                             */
                            getSlotUnderMouse(): number;
                            
                            /**
                             * 
                             * @since 1.1.3
                             * @return the part of the mapping the slot is in.
                             */
                            getType(): string;
                            
                            /**
                             * 
                             * @since 1.1.3
                             * @return the inventory mappings different depending on the type of open container/inventory.
                             */
                            getMap(): Java.java.util.Map<string, number[]>;
                            
                            /**
                             * 
                             * @since 1.1.3
                             * @param slotNum
                             * @return returns the part of the mapping the slot is in.
                             */
                            getLocation(slotNum: number): string;
                            
                            /**
                             * 
                             * @since 1.3.1
                             * @return all craftable recipes
                             */
                            getCraftableRecipes(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.RecipeHelper>;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @return 
                             */
                            getContainerTitle(): string;
                            getRawContainer(): T;
                            toString(): string;
                            
                            /**
                             * 
                             * @since 1.6.0
                             * @return 
                             */
                            getCurrentSyncId(): number;
                            
                        }
                        export interface Draw3D$Line extends Java.Object {
                            pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            color: number;
                            cull: boolean;
                            
                        
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @since 1.0.6
                             */
                            setPos(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void;
                            
                            /**
                             * 
                             * @param color
                             * @since 1.0.6
                             */
                            setColor(color: number): void;
                            
                            /**
                             * 
                             * @param color
                             * @param alpha
                             * @since 1.1.8
                             */
                            setColor(color: number, alpha: number): void;
                            
                            /**
                             * 
                             * @param alpha
                             * @since 1.1.8
                             */
                            setAlpha(alpha: number): void;
                            render(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            
                        }
                        export interface Draw3D$Box extends Java.Object {
                            pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            color: number;
                            fillColor: number;
                            fill: boolean;
                            cull: boolean;
                            
                        
                            
                            /**
                             * 
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @since 1.0.6
                             */
                            setPos(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void;
                            
                            /**
                             * 
                             * @param color
                             * @since 1.0.6
                             */
                            setColor(color: number): void;
                            
                            /**
                             * 
                             * @param fillColor
                             * @since 1.0.6
                             */
                            setFillColor(fillColor: number): void;
                            
                            /**
                             * 
                             * @param color
                             * @param alpha
                             * @since 1.1.8
                             */
                            setColor(color: number, alpha: number): void;
                            
                            /**
                             * 
                             * @param alpha
                             * @since 1.1.8
                             */
                            setAlpha(alpha: number): void;
                            
                            /**
                             * 
                             * @param fillColor
                             * @param alpha
                             * @since 1.1.8
                             */
                            setFillColor(fillColor: number, alpha: number): void;
                            
                            /**
                             * 
                             * @param alpha
                             * @since 1.1.8
                             */
                            setFillAlpha(alpha: number): void;
                            
                            /**
                             * 
                             * @param fill
                             * @since 1.0.6
                             */
                            setFill(fill: boolean): void;
                            render(): void;
                            
                        }
                        export interface Draw3D$Surface extends Java.xyz.wagyourtail.jsmacros.client.api.classes.Draw2D {
                            readonly pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            readonly rotations: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * scale that zIndex is multiplied by to get the actual offset (in blocks) for rendering
                             *  default: `1/1000`
                             *  if there is still z-fighting, increase this value
                             * @since 1.6.5
                             */
                            zIndexScale: number;
                            renderBack: boolean;
                            cull: boolean;
                            
                        
                            setPos(x: number, y: number, z: number): void;
                            setRotations(x: number, y: number, z: number): void;
                            setSizes(x: number, y: number): void;
                            getSizes(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            setMinSubdivisions(minSubdivisions: number): void;
                            getMinSubdivisions(): number;
                            getHeight(): number;
                            getWidth(): number;
                            init(): void;
                            render3D(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            render(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            
                        }
                    }
                
                    export namespace sharedclasses {
                    
                        export interface PositionCommon$Vec3D extends Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D {
                            z1: number;
                            z2: number;
                            
                        
                            getZ1(): number;
                            getZ2(): number;
                            getDeltaZ(): number;
                            getStart(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            getEnd(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            getMagnitude(): number;
                            getMagnitudeSq(): number;
                            add(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param pos
                             * @return 
                             */
                            addStart(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param pos
                             * @return 
                             */
                            addEnd(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param x
                             * @param y
                             * @param z
                             * @return 
                             */
                            addStart(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param x
                             * @param y
                             * @param z
                             * @return 
                             */
                            addEnd(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @return 
                             */
                            add(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            multiply(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x1
                             * @param y1
                             * @param z1
                             * @param x2
                             * @param y2
                             * @param z2
                             * @return 
                             */
                            multiply(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param scale
                             * @return 
                             */
                            scale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            normalize(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            getPitch(): number;
                            getYaw(): number;
                            dotProduct(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D): number;
                            crossProduct(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            reverse(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            toString(): string;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return 
                             */
                            toMojangFloatVector(): /* minecraft classes, as any, because obfuscation: */ any;
                            
                        }
                        export interface PositionCommon$Pos2D extends Java.Object {
                            // static
                            readonly ZERO: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            x: number;
                            y: number;
                            
                        
                            getX(): number;
                            getY(): number;
                            add(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x
                             * @param y
                             * @return 
                             */
                            add(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            multiply(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x
                             * @param y
                             * @return 
                             */
                            multiply(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param scale
                             * @return 
                             */
                            scale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            toString(): string;
                            to3D(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            toVector(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param start_pos
                             * @return 
                             */
                            toVector(start_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param start_x
                             * @param start_y
                             * @return 
                             */
                            toVector(start_x: number, start_y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @return 
                             */
                            toReverseVector(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param end_pos
                             * @return 
                             */
                            toReverseVector(end_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param end_x
                             * @param end_y
                             * @return 
                             */
                            toReverseVector(end_x: number, end_y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                        }
                        export interface PositionCommon$Pos3D extends Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D {
                            // static
                            readonly ZERO: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            z: number;
                            
                        
                            getZ(): number;
                            add(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x
                             * @param y
                             * @param z
                             * @return 
                             */
                            add(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            multiply(pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x
                             * @param y
                             * @param z
                             * @return 
                             */
                            multiply(x: number, y: number, z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param scale
                             * @return 
                             */
                            scale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D;
                            toString(): string;
                            toVector(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param start_pos
                             * @return 
                             */
                            toVector(start_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param start_pos
                             * @return 
                             */
                            toVector(start_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param start_x
                             * @param start_y
                             * @param start_z
                             * @return 
                             */
                            toVector(start_x: number, start_y: number, start_z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @return 
                             */
                            toReverseVector(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            toReverseVector(end_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param end_pos
                             * @return 
                             */
                            toReverseVector(end_pos: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                            /**
                             * 
                             * @since 1.6.4
                             * @param end_x
                             * @param end_y
                             * @param end_z
                             * @return 
                             */
                            toReverseVector(end_x: number, end_y: number, end_z: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                        }
                        export interface PositionCommon$Vec2D extends Java.Object {
                            x1: number;
                            y1: number;
                            x2: number;
                            y2: number;
                            
                        
                            getX1(): number;
                            getY1(): number;
                            getX2(): number;
                            getY2(): number;
                            getDeltaX(): number;
                            getDeltaY(): number;
                            getStart(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            getEnd(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D;
                            getMagnitude(): number;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @return magnitude squared
                             */
                            getMagnitudeSq(): number;
                            add(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @return 
                             */
                            add(x1: number, y1: number, x2: number, y2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            multiply(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @return 
                             */
                            multiply(x1: number, y1: number, x2: number, y2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @since 1.6.3
                             * @param scale
                             * @return 
                             */
                            scale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            dotProduct(vec: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D): number;
                            reverse(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            
                            /**
                             * 
                             * @return a new Vec2D with the same direction but a magnitude of 1
                             * @since 1.6.5
                             */
                            normalize(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D;
                            toString(): string;
                            to3D(): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec3D;
                            
                        }
                        export interface RenderCommon$Text extends Java.Object, Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement {
                            text: /* minecraft classes, as any, because obfuscation: */ any;
                            scale: number;
                            rotation: number;
                            x: number;
                            y: number;
                            color: number;
                            width: number;
                            shadow: boolean;
                            zIndex: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param scale
                             * @return 
                             * @throws Exception
                             */
                            setScale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param rotation
                             * @return 
                             */
                            setRotation(rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @return 
                             */
                            setPos(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param text
                             * @return 
                             */
                            setText(text: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param text
                             * @return 
                             */
                            setText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return 
                             */
                            getText(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return 
                             */
                            getWidth(): number;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            render3D(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getZIndex(): number;
                            
                        }
                        export interface RenderCommon$Image extends Java.Object, Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement {
                            rotation: number;
                            x: number;
                            y: number;
                            width: number;
                            height: number;
                            imageX: number;
                            imageY: number;
                            regionWidth: number;
                            regionHeight: number;
                            textureWidth: number;
                            textureHeight: number;
                            color: number;
                            zIndex: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @param color
                             * @return 
                             */
                            setColor(color: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.6.5
                             * @param color
                             * @param alpha
                             * @return 
                             */
                            setColor(color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             */
                            setPos(x: number, y: number, width: number, height: number): void;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param rotation
                             * @return 
                             */
                            setRotation(rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @param id
                             * @param imageX
                             * @param imageY
                             * @param regionWidth
                             * @param regionHeight
                             * @param textureWidth
                             * @param textureHeight
                             */
                            setImage(id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): void;
                            
                            /**
                             * 
                             * @since 1.2.3
                             * @return 
                             */
                            getImage(): string;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getZIndex(): number;
                            
                        }
                        export interface RenderCommon$Item extends Java.Object, Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement {
                            item: /* minecraft classes, as any, because obfuscation: */ any;
                            ovText: string;
                            overlay: boolean;
                            scale: number;
                            rotation: number;
                            x: number;
                            y: number;
                            zIndex: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @return 
                             */
                            setPos(x: number, y: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param scale
                             * @return 
                             * @throws Exception
                             */
                            setScale(scale: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param rotation
                             * @return 
                             */
                            setRotation(rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @param overlay
                             * @return 
                             */
                            setOverlay(overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             * @param ovText
                             * @return 
                             */
                            setOverlayText(ovText: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.0.5 [citation needed]
                             * @param i
                             * @return 
                             */
                            setItem(i: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.0.5 [citation needed]
                             * @param id
                             * @param count
                             * @return 
                             */
                            setItem(id: string, count: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.0.5 [citation needed]
                             * @return 
                             */
                            getItem(): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            render3D(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getZIndex(): number;
                            
                        }
                        export interface RenderCommon$Rect extends Java.Object, Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement {
                            rotation: number;
                            x1: number;
                            y1: number;
                            x2: number;
                            y2: number;
                            color: number;
                            zIndex: number;
                            
                        
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param color
                             * @return 
                             */
                            setColor(color: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param color
                             * @param alpha
                             * @return 
                             */
                            setColor(color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param alpha
                             * @return 
                             */
                            setAlpha(alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.1.8
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @return 
                             */
                            setPos(x1: number, y1: number, x2: number, y2: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.6
                             * @param rotation
                             * @return 
                             */
                            setRotation(rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getZIndex(): number;
                            
                        }
                        export interface RenderCommon$RenderElement extends Java.Interface, /* supressed minecraft class */ Java.Interface {
                            
                        
                            getZIndex(): number;
                            render3D(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            
                        }
                    }
                
                    export namespace sharedinterfaces {
                    
                        export interface IDraw2D<T> extends Java.Interface {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return screen width
                             */
                            getWidth(): number;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return screen height
                             */
                            getHeight(): number;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return text elements
                             */
                            getTexts(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text>;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return rect elements
                             */
                            getRects(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect>;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return item elements
                             */
                            getItems(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item>;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return image elements
                             */
                            getImages(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image>;
                            
                            /**
                             * 
                             * @since 1.2.9
                             * @return a read only copy of the list of all elements added by scripts.
                             */
                            getElements(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement>;
                            
                            /**
                             * removes any element regardless of type.
                             * @since 1.2.9
                             * @return self for chaining
                             */
                            removeElement(e: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement): T;
                            
                            /**
                             * re-add an element you removed with {@link #removeElement}
                             * @since 1.2.9
                             * @return self for chaining
                             */
                            reAddElement(e: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$RenderElement;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param shadow include shadow layer
                             * @return added text
                             */
                            addText(text: string, x: number, y: number, color: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param zIndex z-index
                             * @param shadow include shadow layer
                             * @return added text
                             */
                            addText(text: string, x: number, y: number, color: number, zIndex: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param shadow include shadow layer
                             * @param scale text scale (as double)
                             * @param rotation text rotation (as degrees)
                             * @return added text
                             */
                            addText(text: string, x: number, y: number, color: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param zIndex z-index
                             * @param shadow include shadow layer
                             * @param scale text scale (as double)
                             * @param rotation text rotation (as degrees)
                             * @return added text
                             */
                            addText(text: string, x: number, y: number, color: number, zIndex: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param shadow include shadow layer
                             * @return added text
                             */
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param zIndex z-index
                             * @param shadow include shadow layer
                             * @return added text
                             */
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, zIndex: number, shadow: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param shadow include shadow layer
                             * @param scale text scale (as double)
                             * @param rotation text rotation (as degrees)
                             * @return added text
                             */
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param text
                             * @param x screen x
                             * @param y screen y
                             * @param color text color
                             * @param zIndex z-index
                             * @param shadow include shadow layer
                             * @param scale text scale (as double)
                             * @param rotation text rotation (as degrees)
                             * @return added text
                             */
                            addText(text: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextHelper, x: number, y: number, color: number, zIndex: number, shadow: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param t
                             * @return self for chaining
                             */
                            removeText(t: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Text): T;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x screen x, top left corner
                             * @param y screen y, top left corner
                             * @param width width on screen
                             * @param height height on screen
                             * @param id image id, in the form {@code minecraft:textures} path'd as found in texture packs, ie {@code assets/minecraft/textures/gui/recipe_book.png} becomes {@code minecraft:textures/gui/recipe_book.png}
                             * @param imageX the left-most coordinate of the texture region
                             * @param imageY the top-most coordinate of the texture region
                             * @param regionWidth the width the texture region
                             * @param regionHeight the height the texture region
                             * @param textureWidth the width of the entire texture
                             * @param textureHeight the height of the entire texture
                             * @return added image
                             */
                            addImage(x: number, y: number, width: number, height: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x screen x, top left corner
                             * @param y screen y, top left corner
                             * @param width width on screen
                             * @param height height on screen
                             * @param zIndex z-index
                             * @param id image id, in the form {@code minecraft:textures} path'd as found in texture packs, ie {@code assets/minecraft/textures/gui/recipe_book.png} becomes {@code minecraft:textures/gui/recipe_book.png}
                             * @param imageX the left-most coordinate of the texture region
                             * @param imageY the top-most coordinate of the texture region
                             * @param regionWidth the width the texture region
                             * @param regionHeight the height the texture region
                             * @param textureWidth the width of the entire texture
                             * @param textureHeight the height of the entire texture
                             * @return added image
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x screen x, top left corner
                             * @param y screen y, top left corner
                             * @param width width on screen
                             * @param height height on screen
                             * @param id image id, in the form {@code minecraft:textures} path'd as found in texture packs, ie {@code assets/minecraft/textures/gui/recipe_book.png} becomes {@code minecraft:textures/gui/recipe_book.png}
                             * @param imageX the left-most coordinate of the texture region
                             * @param imageY the top-most coordinate of the texture region
                             * @param regionWidth the width the texture region
                             * @param regionHeight the height the texture region
                             * @param textureWidth the width of the entire texture
                             * @param textureHeight the height of the entire texture
                             * @param rotation the rotation of the texture (as degrees)
                             * @return added image
                             */
                            addImage(x: number, y: number, width: number, height: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x screen x, top left corner
                             * @param y screen y, top left corner
                             * @param width width on screen
                             * @param height height on screen
                             * @param zIndex z-index
                             * @param id image id, in the form {@code minecraft:textures} path'd as found in texture packs, ie {@code assets/minecraft/textures/gui/recipe_book.png} becomes {@code minecraft:textures/gui/recipe_book.png}
                             * @param imageX the left-most coordinate of the texture region
                             * @param imageY the top-most coordinate of the texture region
                             * @param regionWidth the width the texture region
                             * @param regionHeight the height the texture region
                             * @param textureWidth the width of the entire texture
                             * @param textureHeight the height of the entire texture
                             * @param rotation the rotation of the texture (as degrees)
                             * @return added image
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param zIndex
                             * @param color
                             * @param id
                             * @param imageX
                             * @param imageY
                             * @param regionWidth
                             * @param regionHeight
                             * @param textureWidth
                             * @param textureHeight
                             * @param rotation
                             * @since 1.6.5
                             * @return 
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, color: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param zIndex
                             * @param alpha
                             * @param color
                             * @param id
                             * @param imageX
                             * @param imageY
                             * @param regionWidth
                             * @param regionHeight
                             * @param textureWidth
                             * @param textureHeight
                             * @param rotation
                             * @since 1.6.5
                             * @return 
                             */
                            addImage(x: number, y: number, width: number, height: number, zIndex: number, alpha: number, color: number, id: string, imageX: number, imageY: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param i
                             * @return self for chaining
                             */
                            removeImage(i: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Image): T;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @param color as hex, with alpha channel
                             * @return added rect
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @param color as hex
                             * @param alpha alpha channel 0-255
                             * @return added rect
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @param color as hex
                             * @param alpha alpha channel 0-255
                             * @param rotation as degrees
                             * @return added rect
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x1
                             * @param y1
                             * @param x2
                             * @param y2
                             * @param color as hex
                             * @param alpha alpha channel 0-255
                             * @param rotation as degrees
                             * @param zIndex z-index
                             * @return added rect
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, rotation: number, zIndex: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param r
                             * @return self for chaining
                             */
                            removeRect(r: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect): T;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param id item id
                             * @return added item
                             */
                            addItem(x: number, y: number, id: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param id item id
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, id: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param id item id
                             * @param overlay should include overlay health and count
                             * @return added item
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param id item id
                             * @param overlay should include overlay health and count
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, id: string, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param id item id
                             * @param overlay should include overlay health and count
                             * @param scale scale of item
                             * @param rotation rotation of item
                             * @return added item
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param id item id
                             * @param overlay should include overlay health and count
                             * @param scale scale of item
                             * @param rotation rotation of item
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, id: string, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param item from inventory as helper
                             * @return added item
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param item from inventory as helper
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param item from inventory as helper
                             * @param overlay should include overlay health and count
                             * @return added item
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param item from inventory as helper
                             * @param overlay should include overlay health and count
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param x left most corner
                             * @param y top most corner
                             * @param item from inventory as helper
                             * @param overlay should include overlay health and count
                             * @param scale scale of item
                             * @param rotation rotation of item
                             * @return added item
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x left most corner
                             * @param y top most corner
                             * @param zIndex z-index
                             * @param item from inventory as helper
                             * @param overlay should include overlay health and count
                             * @param scale scale of item
                             * @param rotation rotation of item
                             * @return added item
                             */
                            addItem(x: number, y: number, zIndex: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param i
                             * @return self for chaining
                             */
                            removeItem(i: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item): T;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onInit calls your method as a {@link Consumer}&lt;{@link T}&gt;
                             * @return self for chaining
                             */
                            setOnInit(onInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<T, Java.Object, Java.Object, any>): T;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param catchInit calls your method as a {@link Consumer}&lt;{@link String}&gt;
                             * @return self for chaining
                             */
                            setOnFailInit(catchInit: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<string, Java.Object, Java.Object, any>): T;
                            
                            /**
                             * internal
                             * @param matrixStack
                             */
                            render(matrixStack: /* minecraft classes, as any, because obfuscation: */ any): void;
                            
                        }
                        export interface IScreen extends Java.Interface, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IDraw2D<Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen> {
                            
                        
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @return 
                             */
                            getScreenClassName(): string;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @return 
                             */
                            getTitleText(): string;
                            
                            /**
                             * in `1.3.1` updated to work with all button widgets not just ones added by scripts.
                             * @since 1.0.5
                             * @return 
                             */
                            getButtonWidgets(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>>;
                            
                            /**
                             * in `1.3.1` updated to work with all text fields not just ones added by scripts.
                             * @since 1.0.5
                             * @return 
                             */
                            getTextFields(): Java.java.util.List<Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper>;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param text
                             * @param callback calls your method as a {@link Consumer}&lt;{@link ButtonWidgetHelper}&gt;
                             * @return 
                             */
                            addButton(x: number, y: number, width: number, height: number, text: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>;
                            
                            /**
                             * 
                             * @since 1.4.0
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param zIndex
                             * @param text
                             * @param callback calls your method as a {@link Consumer}&lt;{@link ButtonWidgetHelper}&gt;
                             * @return 
                             */
                            addButton(x: number, y: number, width: number, height: number, zIndex: number, text: string, callback: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param btn
                             * @return 
                             */
                            removeButton(btn: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ButtonWidgetHelper<any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param message
                             * @param onChange calls your method as a {@link Consumer}&lt;{@link String}&gt;
                             * @return 
                             */
                            addTextInput(x: number, y: number, width: number, height: number, message: string, onChange: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<string, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param x
                             * @param y
                             * @param width
                             * @param height
                             * @param zIndex
                             * @param message
                             * @param onChange calls your method as a {@link Consumer}&lt;{@link String}&gt;
                             * @return 
                             */
                            addTextInput(x: number, y: number, width: number, height: number, zIndex: number, message: string, onChange: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<string, Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper;
                            
                            /**
                             * 
                             * @since 1.0.5
                             * @param inp
                             * @return 
                             */
                            removeTextInput(inp: Java.xyz.wagyourtail.jsmacros.client.api.helpers.TextFieldWidgetHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onMouseDown calls your method as a {@link BiConsumer}&lt;{@link PositionCommon.Pos2D}, {@link Integer}&gt;
                             * @return 
                             */
                            setOnMouseDown(onMouseDown: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D, number, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onMouseDrag calls your method as a {@link BiConsumer}&lt;{@link PositionCommon.Vec2D}, {@link Integer}&gt;
                             * @return 
                             */
                            setOnMouseDrag(onMouseDrag: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Vec2D, number, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onMouseUp calls your method as a {@link BiConsumer}&lt;{@link PositionCommon.Pos2D}, {@link Integer}&gt;
                             * @return 
                             */
                            setOnMouseUp(onMouseUp: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D, number, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onScroll calls your method as a {@link BiConsumer}&lt;{@link PositionCommon.Pos2D}, {@link Double}&gt;
                             * @return 
                             */
                            setOnScroll(onScroll: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos2D, number, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onKeyPressed calls your method as a {@link BiConsumer}&lt;{@link Integer}, {@link Integer}&gt;
                             * @return 
                             */
                            setOnKeyPressed(onKeyPressed: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<number, number, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.7
                             * @param onClose calls your method as a {@link Consumer}&lt;{@link IScreen}&gt;
                             * @return 
                             */
                            setOnClose(onClose: Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, Java.Object, any>): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.1.9
                             */
                            close(): void;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addRect(x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            removeRect(r: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Rect): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, id: string): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, id: string, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            addItem(x: number, y: number, item: Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper, overlay: boolean, scale: number, rotation: number): Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item;
                            
                            /**
                             * 
                             * @since 1.2.0
                             */
                            removeItem(i: Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.RenderCommon$Item): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * calls the screen's init function re-loading it.
                             * @since 1.2.7
                             */
                            reloadScreen(): Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen;
                            
                            /**
                             * DON'T TOUCH
                             * @since 1.4.1
                             */
                            onRenderInternal(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                            getOnClose(): Java.xyz.wagyourtail.jsmacros.core.MethodWrapper<Java.xyz.wagyourtail.jsmacros.client.api.sharedinterfaces.IScreen, Java.Object, Java.Object, any>;
                            
                        }
                    }
                }
            }
        }
    
        export namespace wagyourgui {
        
            export interface BaseScreen extends /* supressed minecraft class */ Java.Object, Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent {
                
            
                // static
                trimmed(textRenderer: /* minecraft classes, as any, because obfuscation: */ any, str: /* minecraft classes, as any, because obfuscation: */ any, width: number): /* minecraft classes, as any, because obfuscation: */ any;
                setParent(parent: /* minecraft classes, as any, because obfuscation: */ any): void;
                reload(): void;
                removed(): void;
                openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                getFirstOverlayParent(): Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent;
                getChildOverlay(): Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer;
                openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
                closeOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                removeButton(btn: /* minecraft classes, as any, because obfuscation: */ any): void;
                addButton<T>(button: T): T;
                setFocused(focused: /* minecraft classes, as any, because obfuscation: */ any): void;
                keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
                mouseScrolled(mouseX: number, mouseY: number, amount: number): boolean;
                mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
                render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                shouldCloseOnEsc(): boolean;
                updateSettings(): void;
                onClose(): void;
                openParent(): void;
                
            }
        
            export namespace overlays {
            
                export interface OverlayContainer extends Java.xyz.wagyourtail.wagyourgui.containers.MultiElementContainer<Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent>, Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent {
                    savedBtnStates: Java.java.util.Map</* minecraft classes, as any, because obfuscation: */ any, boolean>;
                    scroll: Java.xyz.wagyourtail.wagyourgui.elements.Scrollbar;
                    
                
                    removeButton(btn: /* minecraft classes, as any, because obfuscation: */ any): void;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                    getFirstOverlayParent(): Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
                    getChildOverlay(): Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer;
                    closeOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                    setFocused(focused: /* minecraft classes, as any, because obfuscation: */ any): void;
                    onClick(mouseX: number, mouseY: number, button: number): void;
                    
                    /**
                     * 
                     * @return true if should be handled by overlay
                     */
                    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
                    close(): void;
                    onClose(): void;
                    renderBackground(matrices: /* minecraft classes, as any, because obfuscation: */ any): void;
                    render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                    
                }
                export interface IOverlayParent extends Java.Interface, Java.xyz.wagyourtail.wagyourgui.containers.IContainerParent {
                    
                
                    closeOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                    setFocused(focused: /* minecraft classes, as any, because obfuscation: */ any): void;
                    getChildOverlay(): Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer;
                    
                }
            }
        
            export namespace containers {
            
                export interface MultiElementContainer<T> extends /* supressed minecraft class */ Java.Object, Java.xyz.wagyourtail.wagyourgui.containers.IContainerParent {
                    readonly parent: T;
                    x: number;
                    y: number;
                    width: number;
                    height: number;
                    
                
                    init(): void;
                    getVisible(): boolean;
                    setVisible(visible: boolean): void;
                    addButton<T>(btn: T): T;
                    getButtons(): Java.java.util.List</* minecraft classes, as any, because obfuscation: */ any>;
                    setPos(x: number, y: number, width: number, height: number): void;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
                    removeButton(button: /* minecraft classes, as any, because obfuscation: */ any): void;
                    getFirstOverlayParent(): Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent;
                    render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                    
                }
                export interface IContainerParent extends Java.Interface {
                    
                
                    addButton<T>(drawableElement: T): T;
                    addDrawableChild<T>(drawableElement: T): T;
                    removeButton(button: /* minecraft classes, as any, because obfuscation: */ any): void;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer): void;
                    openOverlay(overlay: Java.xyz.wagyourtail.wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
                    getFirstOverlayParent(): Java.xyz.wagyourtail.wagyourgui.overlays.IOverlayParent;
                    
                }
            }
        
            export namespace elements {
            
                export interface Scrollbar extends /* supressed minecraft class */ Java.Object {
                    
                
                    setPos(x: number, y: number, width: number, height: number): Java.xyz.wagyourtail.wagyourgui.elements.Scrollbar;
                    setScrollPages(scrollPages: number): void;
                    scrollToPercent(percent: number): void;
                    onClick(mouseX: number, mouseY: number): void;
                    onChange(): void;
                    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
                    render(matrices: /* minecraft classes, as any, because obfuscation: */ any, mouseX: number, mouseY: number, delta: number): void;
                    
                }
            }
        }
    }

    export namespace io.noties.prism4j {
    
        export interface Prism4j$Node extends Java.Interface {
            
        
            textLength(): number;
            isSyntax(): boolean;
            
        }
    }

    export namespace com {
    
    
        export namespace mojang.brigadier {
        
            export interface ImmutableStringReader extends Java.Interface {
                
            
                getString(): string;
                getRemainingLength(): number;
                getTotalLength(): number;
                getCursor(): number;
                getRead(): string;
                getRemaining(): string;
                canRead(arg0: number): boolean;
                canRead(): boolean;
                peek(): number;
                peek(arg0: number): number;
                
            }
            export interface Command<S> extends Java.Interface {
                // static
                readonly SINGLE_SUCCESS: number;
                
            
                run(arg0: Java.com.mojang.brigadier.context.CommandContext<S>): number;
                
            }
            export interface Message extends Java.Interface {
                
            
                getString(): string;
                
            }
            export interface RedirectModifier<S> extends Java.Interface {
                
            
                apply(arg0: Java.com.mojang.brigadier.context.CommandContext<S>): Java.java.util.Collection<S>;
                
            }
            export interface AmbiguityConsumer<S> extends Java.Interface {
                
            
                ambiguous(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: Java.com.mojang.brigadier.tree.CommandNode<S>, arg2: Java.com.mojang.brigadier.tree.CommandNode<S>, arg3: Java.java.util.Collection<string>): void;
                
            }
            export interface CommandDispatcher<S> extends Java.Object {
                // static
                readonly ARGUMENT_SEPARATOR: string;
                // static
                readonly ARGUMENT_SEPARATOR_CHAR: number;
                
            
                register(arg0: Java.com.mojang.brigadier.builder.LiteralArgumentBuilder<S>): Java.com.mojang.brigadier.tree.LiteralCommandNode<S>;
                setConsumer(arg0: Java.com.mojang.brigadier.ResultConsumer<S>): void;
                execute(arg0: string, arg1: S): number;
                execute(arg0: Java.com.mojang.brigadier.StringReader, arg1: S): number;
                execute(arg0: Java.com.mojang.brigadier.ParseResults<S>): number;
                parse(arg0: string, arg1: S): Java.com.mojang.brigadier.ParseResults<S>;
                parse(arg0: Java.com.mojang.brigadier.StringReader, arg1: S): Java.com.mojang.brigadier.ParseResults<S>;
                getAllUsage(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: S, arg2: boolean): string[];
                getSmartUsage(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: S): Java.java.util.Map<Java.com.mojang.brigadier.tree.CommandNode<S>, string>;
                getCompletionSuggestions(arg0: Java.com.mojang.brigadier.ParseResults<S>): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                getCompletionSuggestions(arg0: Java.com.mojang.brigadier.ParseResults<S>, arg1: number): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                getRoot(): Java.com.mojang.brigadier.tree.RootCommandNode<S>;
                getPath(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>): Java.java.util.Collection<string>;
                findNode(arg0: Java.java.util.Collection<string>): Java.com.mojang.brigadier.tree.CommandNode<S>;
                findAmbiguities(arg0: Java.com.mojang.brigadier.AmbiguityConsumer<S>): void;
                
            }
            export interface StringReader extends Java.Object, Java.com.mojang.brigadier.ImmutableStringReader {
                
            
                getString(): string;
                setCursor(arg0: number): void;
                getRemainingLength(): number;
                getTotalLength(): number;
                getCursor(): number;
                getRead(): string;
                getRemaining(): string;
                canRead(arg0: number): boolean;
                canRead(): boolean;
                peek(): number;
                peek(arg0: number): number;
                read(): number;
                skip(): void;
                // static
                isAllowedNumber(arg0: number): boolean;
                // static
                isQuotedStringStart(arg0: number): boolean;
                skipWhitespace(): void;
                readInt(): number;
                readLong(): number;
                readDouble(): number;
                readFloat(): number;
                // static
                isAllowedInUnquotedString(arg0: number): boolean;
                readUnquotedString(): string;
                readQuotedString(): string;
                readStringUntil(arg0: number): string;
                readString(): string;
                readBoolean(): boolean;
                expect(arg0: number): void;
                
            }
            export interface SingleRedirectModifier<S> extends Java.Interface {
                
            
                apply(arg0: Java.com.mojang.brigadier.context.CommandContext<S>): S;
                
            }
            export interface ResultConsumer<S> extends Java.Interface {
                
            
                onCommandComplete(arg0: Java.com.mojang.brigadier.context.CommandContext<S>, arg1: boolean, arg2: number): void;
                
            }
            export interface ParseResults<S> extends Java.Object {
                
            
                getContext(): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                getReader(): Java.com.mojang.brigadier.ImmutableStringReader;
                getExceptions(): Java.java.util.Map<Java.com.mojang.brigadier.tree.CommandNode<S>, Java.com.mojang.brigadier.exceptions.CommandSyntaxException>;
                
            }
        
            export namespace context {
            
                export interface CommandContext<S> extends Java.Object {
                    
                
                    copyFor(arg0: S): Java.com.mojang.brigadier.context.CommandContext<S>;
                    getChild(): Java.com.mojang.brigadier.context.CommandContext<S>;
                    getLastChild(): Java.com.mojang.brigadier.context.CommandContext<S>;
                    getCommand(): Java.com.mojang.brigadier.Command<S>;
                    getSource(): S;
                    getArgument<V>(arg0: string, arg1: Java.Class<V>): V;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    getRedirectModifier(): Java.com.mojang.brigadier.RedirectModifier<S>;
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    getInput(): string;
                    getRootNode(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    getNodes(): Java.java.util.List<Java.com.mojang.brigadier.context.ParsedCommandNode<S>>;
                    hasNodes(): boolean;
                    isForked(): boolean;
                    
                }
                export interface StringRange extends Java.Object {
                    
                
                    // static
                    at(arg0: number): Java.com.mojang.brigadier.context.StringRange;
                    // static
                    between(arg0: number, arg1: number): Java.com.mojang.brigadier.context.StringRange;
                    // static
                    encompassing(arg0: Java.com.mojang.brigadier.context.StringRange, arg1: Java.com.mojang.brigadier.context.StringRange): Java.com.mojang.brigadier.context.StringRange;
                    getStart(): number;
                    getEnd(): number;
                    get(arg0: Java.com.mojang.brigadier.ImmutableStringReader): string;
                    get(arg0: string): string;
                    isEmpty(): boolean;
                    getLength(): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ParsedCommandNode<S> extends Java.Object {
                    
                
                    getNode(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    toString(): string;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    
                }
                export interface CommandContextBuilder<S> extends Java.Object {
                    
                
                    withSource(arg0: S): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    getSource(): S;
                    getRootNode(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    withArgument(arg0: string, arg1: Java.com.mojang.brigadier.context.ParsedArgument<S, any>): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    getArguments(): Java.java.util.Map<string, Java.com.mojang.brigadier.context.ParsedArgument<S, any>>;
                    withCommand(arg0: Java.com.mojang.brigadier.Command<S>): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    withNode(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: Java.com.mojang.brigadier.context.StringRange): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    copy(): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    withChild(arg0: Java.com.mojang.brigadier.context.CommandContextBuilder<S>): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    getChild(): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    getLastChild(): Java.com.mojang.brigadier.context.CommandContextBuilder<S>;
                    getCommand(): Java.com.mojang.brigadier.Command<S>;
                    getNodes(): Java.java.util.List<Java.com.mojang.brigadier.context.ParsedCommandNode<S>>;
                    build(arg0: string): Java.com.mojang.brigadier.context.CommandContext<S>;
                    getDispatcher(): Java.com.mojang.brigadier.CommandDispatcher<S>;
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    findSuggestionContext(arg0: number): Java.com.mojang.brigadier.context.SuggestionContext<S>;
                    
                }
                export interface SuggestionContext<S> extends Java.Object {
                    readonly parent: Java.com.mojang.brigadier.tree.CommandNode<S>;
                    readonly startPos: number;
                    
                
                    
                }
                export interface ParsedArgument<S, T> extends Java.Object {
                    
                
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    getResult(): T;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    
                }
            }
        
            export namespace suggestion {
            
                export interface SuggestionsBuilder extends Java.Object {
                    
                
                    getInput(): string;
                    getStart(): number;
                    getRemaining(): string;
                    build(): Java.com.mojang.brigadier.suggestion.Suggestions;
                    buildFuture(): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                    suggest(arg0: string): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    suggest(arg0: string, arg1: Java.com.mojang.brigadier.Message): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    suggest(arg0: number): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    suggest(arg0: number, arg1: Java.com.mojang.brigadier.Message): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    add(arg0: Java.com.mojang.brigadier.suggestion.SuggestionsBuilder): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    createOffset(arg0: number): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    restart(): Java.com.mojang.brigadier.suggestion.SuggestionsBuilder;
                    
                }
                export interface Suggestions extends Java.Object {
                    
                
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    getList(): Java.java.util.List<Java.com.mojang.brigadier.suggestion.Suggestion>;
                    isEmpty(): boolean;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    // static
                    empty(): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                    // static
                    merge(arg0: string, arg1: Java.java.util.Collection<Java.com.mojang.brigadier.suggestion.Suggestions>): Java.com.mojang.brigadier.suggestion.Suggestions;
                    // static
                    create(arg0: string, arg1: Java.java.util.Collection<Java.com.mojang.brigadier.suggestion.Suggestion>): Java.com.mojang.brigadier.suggestion.Suggestions;
                    
                }
                export interface Suggestion extends Java.Object, Java.Comparable<Java.com.mojang.brigadier.suggestion.Suggestion> {
                    
                
                    getRange(): Java.com.mojang.brigadier.context.StringRange;
                    getText(): string;
                    getTooltip(): Java.com.mojang.brigadier.Message;
                    apply(arg0: string): string;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    compareTo(arg0: Java.com.mojang.brigadier.suggestion.Suggestion): number;
                    compareToIgnoreCase(arg0: Java.com.mojang.brigadier.suggestion.Suggestion): number;
                    expand(arg0: string, arg1: Java.com.mojang.brigadier.context.StringRange): Java.com.mojang.brigadier.suggestion.Suggestion;
                    
                }
            }
        
            export namespace tree {
            
                export interface CommandNode<S> extends Java.Object, Java.Comparable<Java.com.mojang.brigadier.tree.CommandNode<S>> {
                    
                
                    getCommand(): Java.com.mojang.brigadier.Command<S>;
                    getChildren(): Java.java.util.Collection<Java.com.mojang.brigadier.tree.CommandNode<S>>;
                    getChild(arg0: string): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    getRedirect(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    getRedirectModifier(): Java.com.mojang.brigadier.RedirectModifier<S>;
                    canUse(arg0: S): boolean;
                    addChild(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>): void;
                    findAmbiguities(arg0: Java.com.mojang.brigadier.AmbiguityConsumer<S>): void;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    getRequirement(): Java.java.util._function.Predicate<S>;
                    getName(): string;
                    getUsageText(): string;
                    parse(arg0: Java.com.mojang.brigadier.StringReader, arg1: Java.com.mojang.brigadier.context.CommandContextBuilder<S>): void;
                    listSuggestions(arg0: Java.com.mojang.brigadier.context.CommandContext<S>, arg1: Java.com.mojang.brigadier.suggestion.SuggestionsBuilder): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                    createBuilder(): Java.com.mojang.brigadier.builder.ArgumentBuilder<S, any>;
                    getRelevantNodes(arg0: Java.com.mojang.brigadier.StringReader): Java.java.util.Collection<any>;
                    compareTo(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>): number;
                    isFork(): boolean;
                    getExamples(): Java.java.util.Collection<string>;
                    
                }
                export interface RootCommandNode<S> extends Java.com.mojang.brigadier.tree.CommandNode<S> {
                    
                
                    getName(): string;
                    getUsageText(): string;
                    parse(arg0: Java.com.mojang.brigadier.StringReader, arg1: Java.com.mojang.brigadier.context.CommandContextBuilder<S>): void;
                    listSuggestions(arg0: Java.com.mojang.brigadier.context.CommandContext<S>, arg1: Java.com.mojang.brigadier.suggestion.SuggestionsBuilder): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                    isValidInput(arg0: string): boolean;
                    equals(arg0: Java.Object): boolean;
                    createBuilder(): Java.com.mojang.brigadier.builder.ArgumentBuilder<S, any>;
                    getExamples(): Java.java.util.Collection<string>;
                    toString(): string;
                    
                }
                export interface LiteralCommandNode<S> extends Java.com.mojang.brigadier.tree.CommandNode<S> {
                    
                
                    getLiteral(): string;
                    getName(): string;
                    parse(arg0: Java.com.mojang.brigadier.StringReader, arg1: Java.com.mojang.brigadier.context.CommandContextBuilder<S>): void;
                    listSuggestions(arg0: Java.com.mojang.brigadier.context.CommandContext<S>, arg1: Java.com.mojang.brigadier.suggestion.SuggestionsBuilder): Java.java.util.concurrent.CompletableFuture<Java.com.mojang.brigadier.suggestion.Suggestions>;
                    isValidInput(arg0: string): boolean;
                    equals(arg0: Java.Object): boolean;
                    getUsageText(): string;
                    hashCode(): number;
                    createBuilder(): Java.com.mojang.brigadier.builder.LiteralArgumentBuilder<S>;
                    getExamples(): Java.java.util.Collection<string>;
                    toString(): string;
                    
                }
            }
        
            export namespace builder {
            
                export interface ArgumentBuilder<S, T> extends Java.Object {
                    
                
                    then(arg0: Java.com.mojang.brigadier.builder.ArgumentBuilder<S, any>): T;
                    then(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>): T;
                    getArguments(): Java.java.util.Collection<Java.com.mojang.brigadier.tree.CommandNode<S>>;
                    executes(arg0: Java.com.mojang.brigadier.Command<S>): T;
                    getCommand(): Java.com.mojang.brigadier.Command<S>;
                    requires(arg0: Java.java.util._function.Predicate<S>): T;
                    getRequirement(): Java.java.util._function.Predicate<S>;
                    redirect(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>): T;
                    redirect(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: Java.com.mojang.brigadier.SingleRedirectModifier<S>): T;
                    fork(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: Java.com.mojang.brigadier.RedirectModifier<S>): T;
                    forward(arg0: Java.com.mojang.brigadier.tree.CommandNode<S>, arg1: Java.com.mojang.brigadier.RedirectModifier<S>, arg2: boolean): T;
                    getRedirect(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    getRedirectModifier(): Java.com.mojang.brigadier.RedirectModifier<S>;
                    isFork(): boolean;
                    build(): Java.com.mojang.brigadier.tree.CommandNode<S>;
                    
                }
                export interface LiteralArgumentBuilder<S> extends Java.com.mojang.brigadier.builder.ArgumentBuilder<S, Java.com.mojang.brigadier.builder.LiteralArgumentBuilder<S>> {
                    
                
                    // static
                    literal<S>(arg0: string): Java.com.mojang.brigadier.builder.LiteralArgumentBuilder<S>;
                    getLiteral(): string;
                    build(): Java.com.mojang.brigadier.tree.LiteralCommandNode<S>;
                    
                }
            }
        
            export namespace exceptions {
            
                export interface CommandSyntaxException extends Java.Exception {
                    // static
                    readonly CONTEXT_AMOUNT: number;
                    // static
                    ENABLE_COMMAND_STACK_TRACES: boolean;
                    // static
                    BUILT_IN_EXCEPTIONS: Java.com.mojang.brigadier.exceptions.BuiltInExceptionProvider;
                    
                
                    getMessage(): string;
                    getRawMessage(): Java.com.mojang.brigadier.Message;
                    getContext(): string;
                    getType(): Java.com.mojang.brigadier.exceptions.CommandExceptionType;
                    getInput(): string;
                    getCursor(): number;
                    
                }
                export interface CommandExceptionType extends Java.Interface {
                    
                
                    
                }
                export interface BuiltInExceptionProvider extends Java.Interface {
                    
                
                    doubleTooLow(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    doubleTooHigh(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    floatTooLow(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    floatTooHigh(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    integerTooLow(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    integerTooHigh(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    longTooLow(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    longTooHigh(): Java.com.mojang.brigadier.exceptions.Dynamic2CommandExceptionType;
                    literalIncorrect(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerExpectedStartOfQuote(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerExpectedEndOfQuote(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerInvalidEscape(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerInvalidBool(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerInvalidInt(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerExpectedInt(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerInvalidLong(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerExpectedLong(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerInvalidDouble(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerExpectedDouble(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerInvalidFloat(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    readerExpectedFloat(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerExpectedBool(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    readerExpectedSymbol(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    dispatcherUnknownCommand(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    dispatcherUnknownArgument(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    dispatcherExpectedArgumentSeparator(): Java.com.mojang.brigadier.exceptions.SimpleCommandExceptionType;
                    dispatcherParseException(): Java.com.mojang.brigadier.exceptions.DynamicCommandExceptionType;
                    
                }
                export interface SimpleCommandExceptionType extends Java.Object, Java.com.mojang.brigadier.exceptions.CommandExceptionType {
                    
                
                    create(): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    createWithContext(arg0: Java.com.mojang.brigadier.ImmutableStringReader): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    toString(): string;
                    
                }
                export interface Dynamic2CommandExceptionType extends Java.Object, Java.com.mojang.brigadier.exceptions.CommandExceptionType {
                    
                
                    create(arg0: Java.Object, arg1: Java.Object): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    createWithContext(arg0: Java.com.mojang.brigadier.ImmutableStringReader, arg1: Java.Object, arg2: Java.Object): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    
                }
                export interface DynamicCommandExceptionType extends Java.Object, Java.com.mojang.brigadier.exceptions.CommandExceptionType {
                    
                
                    create(arg0: Java.Object): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    createWithContext(arg0: Java.com.mojang.brigadier.ImmutableStringReader, arg1: Java.Object): Java.com.mojang.brigadier.exceptions.CommandSyntaxException;
                    
                }
            }
        }
    
        export namespace google.gson {
        
            export interface JsonObject extends Java.com.google.gson.JsonElement {
                
            
                add(arg0: string, arg1: Java.com.google.gson.JsonElement): void;
                remove(arg0: string): Java.com.google.gson.JsonElement;
                addProperty(arg0: string, arg1: string): void;
                addProperty(arg0: string, arg1: Java.Number): void;
                addProperty(arg0: string, arg1: boolean): void;
                addProperty(arg0: string, arg1: number): void;
                entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<string, Java.com.google.gson.JsonElement>>;
                size(): number;
                has(arg0: string): boolean;
                get(arg0: string): Java.com.google.gson.JsonElement;
                getAsJsonPrimitive(arg0: string): Java.com.google.gson.JsonPrimitive;
                getAsJsonArray(arg0: string): Java.com.google.gson.JsonArray;
                getAsJsonObject(arg0: string): Java.com.google.gson.JsonObject;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                
            }
            export interface JsonArray extends Java.com.google.gson.JsonElement, Java.Iterable<Java.com.google.gson.JsonElement> {
                
            
                add(arg0: boolean): void;
                add(arg0: number): void;
                add(arg0: Java.Number): void;
                add(arg0: string): void;
                add(arg0: Java.com.google.gson.JsonElement): void;
                addAll(arg0: Java.com.google.gson.JsonArray): void;
                set(arg0: number, arg1: Java.com.google.gson.JsonElement): Java.com.google.gson.JsonElement;
                remove(arg0: Java.com.google.gson.JsonElement): boolean;
                remove(arg0: number): Java.com.google.gson.JsonElement;
                contains(arg0: Java.com.google.gson.JsonElement): boolean;
                size(): number;
                iterator(): Java.java.util.Iterator<Java.com.google.gson.JsonElement>;
                get(arg0: number): Java.com.google.gson.JsonElement;
                getAsNumber(): Java.Number;
                getAsString(): string;
                getAsDouble(): number;
                getAsBigDecimal(): Java.java.math.BigDecimal;
                getAsBigInteger(): Java.java.math.BigInteger;
                getAsFloat(): number;
                getAsLong(): number;
                getAsInt(): number;
                getAsByte(): number;
                getAsCharacter(): number;
                getAsShort(): number;
                getAsBoolean(): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                
            }
            export interface JsonPrimitive extends Java.com.google.gson.JsonElement {
                
            
                isBoolean(): boolean;
                getAsBoolean(): boolean;
                isNumber(): boolean;
                getAsNumber(): Java.Number;
                isString(): boolean;
                getAsString(): string;
                getAsDouble(): number;
                getAsBigDecimal(): Java.java.math.BigDecimal;
                getAsBigInteger(): Java.java.math.BigInteger;
                getAsFloat(): number;
                getAsLong(): number;
                getAsShort(): number;
                getAsInt(): number;
                getAsByte(): number;
                getAsCharacter(): number;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                
            }
            export interface JsonElement extends Java.Object {
                
            
                isJsonArray(): boolean;
                isJsonObject(): boolean;
                isJsonPrimitive(): boolean;
                isJsonNull(): boolean;
                getAsJsonObject(): Java.com.google.gson.JsonObject;
                getAsJsonArray(): Java.com.google.gson.JsonArray;
                getAsJsonPrimitive(): Java.com.google.gson.JsonPrimitive;
                getAsJsonNull(): Java.com.google.gson.JsonNull;
                getAsBoolean(): boolean;
                getAsNumber(): Java.Number;
                getAsString(): string;
                getAsDouble(): number;
                getAsFloat(): number;
                getAsLong(): number;
                getAsInt(): number;
                getAsByte(): number;
                getAsCharacter(): number;
                getAsBigDecimal(): Java.java.math.BigDecimal;
                getAsBigInteger(): Java.java.math.BigInteger;
                getAsShort(): number;
                toString(): string;
                
            }
            export interface JsonNull extends Java.com.google.gson.JsonElement {
                // static
                readonly INSTANCE: Java.com.google.gson.JsonNull;
                
            
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                
            }
        }
    
        export namespace neovisionaries.ws.client {
        
            export interface WebSocketException extends Java.Exception {
                
            
                getError(): Java.com.neovisionaries.ws.client.WebSocketError;
                
            }
            export interface WebSocketFrame extends Java.Object {
                
            
                getFin(): boolean;
                setFin(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocketFrame;
                getRsv1(): boolean;
                setRsv1(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocketFrame;
                getRsv2(): boolean;
                setRsv2(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocketFrame;
                getRsv3(): boolean;
                setRsv3(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocketFrame;
                getOpcode(): number;
                setOpcode(arg0: number): Java.com.neovisionaries.ws.client.WebSocketFrame;
                isContinuationFrame(): boolean;
                isTextFrame(): boolean;
                isBinaryFrame(): boolean;
                isCloseFrame(): boolean;
                isPingFrame(): boolean;
                isPongFrame(): boolean;
                isDataFrame(): boolean;
                isControlFrame(): boolean;
                hasPayload(): boolean;
                getPayloadLength(): number;
                getPayload(): number[];
                getPayloadText(): string;
                setPayload(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocketFrame;
                setPayload(arg0: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                setCloseFramePayload(arg0: number, arg1: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                getCloseCode(): number;
                getCloseReason(): string;
                toString(): string;
                // static
                createContinuationFrame(): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createContinuationFrame(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createContinuationFrame(arg0: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createTextFrame(arg0: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createBinaryFrame(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createCloseFrame(): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createCloseFrame(arg0: number): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createCloseFrame(arg0: number, arg1: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPingFrame(): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPingFrame(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPingFrame(arg0: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPongFrame(): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPongFrame(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocketFrame;
                // static
                createPongFrame(arg0: string): Java.com.neovisionaries.ws.client.WebSocketFrame;
                
            }
            export interface WebSocket extends Java.Object {
                
            
                recreate(): Java.com.neovisionaries.ws.client.WebSocket;
                recreate(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                getState(): Java.com.neovisionaries.ws.client.WebSocketState;
                isOpen(): boolean;
                addProtocol(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                removeProtocol(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                clearProtocols(): Java.com.neovisionaries.ws.client.WebSocket;
                addExtension(arg0: Java.com.neovisionaries.ws.client.WebSocketExtension): Java.com.neovisionaries.ws.client.WebSocket;
                addExtension(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                removeExtension(arg0: Java.com.neovisionaries.ws.client.WebSocketExtension): Java.com.neovisionaries.ws.client.WebSocket;
                removeExtensions(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                clearExtensions(): Java.com.neovisionaries.ws.client.WebSocket;
                addHeader(arg0: string, arg1: string): Java.com.neovisionaries.ws.client.WebSocket;
                removeHeaders(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                clearHeaders(): Java.com.neovisionaries.ws.client.WebSocket;
                setUserInfo(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                setUserInfo(arg0: string, arg1: string): Java.com.neovisionaries.ws.client.WebSocket;
                clearUserInfo(): Java.com.neovisionaries.ws.client.WebSocket;
                isExtended(): boolean;
                setExtended(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                isAutoFlush(): boolean;
                setAutoFlush(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                isMissingCloseFrameAllowed(): boolean;
                setMissingCloseFrameAllowed(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                isDirectTextMessage(): boolean;
                setDirectTextMessage(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                flush(): Java.com.neovisionaries.ws.client.WebSocket;
                getFrameQueueSize(): number;
                setFrameQueueSize(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                getMaxPayloadSize(): number;
                setMaxPayloadSize(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                getPingInterval(): number;
                setPingInterval(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                getPongInterval(): number;
                setPongInterval(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                getPingPayloadGenerator(): Java.com.neovisionaries.ws.client.PayloadGenerator;
                setPingPayloadGenerator(arg0: Java.com.neovisionaries.ws.client.PayloadGenerator): Java.com.neovisionaries.ws.client.WebSocket;
                getPongPayloadGenerator(): Java.com.neovisionaries.ws.client.PayloadGenerator;
                setPongPayloadGenerator(arg0: Java.com.neovisionaries.ws.client.PayloadGenerator): Java.com.neovisionaries.ws.client.WebSocket;
                getPingSenderName(): string;
                setPingSenderName(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                getPongSenderName(): string;
                setPongSenderName(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                addListener(arg0: Java.com.neovisionaries.ws.client.WebSocketListener): Java.com.neovisionaries.ws.client.WebSocket;
                addListeners(arg0: Java.java.util.List<Java.com.neovisionaries.ws.client.WebSocketListener>): Java.com.neovisionaries.ws.client.WebSocket;
                removeListener(arg0: Java.com.neovisionaries.ws.client.WebSocketListener): Java.com.neovisionaries.ws.client.WebSocket;
                removeListeners(arg0: Java.java.util.List<Java.com.neovisionaries.ws.client.WebSocketListener>): Java.com.neovisionaries.ws.client.WebSocket;
                clearListeners(): Java.com.neovisionaries.ws.client.WebSocket;
                getSocket(): Java.java.net.Socket;
                getConnectedSocket(): Java.java.net.Socket;
                getURI(): Java.java.net.URI;
                connect(): Java.com.neovisionaries.ws.client.WebSocket;
                connect(arg0: Java.java.util.concurrent.ExecutorService): Java.java.util.concurrent.Future<Java.com.neovisionaries.ws.client.WebSocket>;
                connectable(): Java.java.util.concurrent.Callable<Java.com.neovisionaries.ws.client.WebSocket>;
                connectAsynchronously(): Java.com.neovisionaries.ws.client.WebSocket;
                disconnect(): Java.com.neovisionaries.ws.client.WebSocket;
                disconnect(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                disconnect(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                disconnect(arg0: number, arg1: string): Java.com.neovisionaries.ws.client.WebSocket;
                disconnect(arg0: number, arg1: string, arg2: number): Java.com.neovisionaries.ws.client.WebSocket;
                getAgreedExtensions(): Java.java.util.List<Java.com.neovisionaries.ws.client.WebSocketExtension>;
                getAgreedProtocol(): string;
                sendFrame(arg0: Java.com.neovisionaries.ws.client.WebSocketFrame): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(arg0: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(arg0: string, arg1: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocket;
                sendContinuation(arg0: number[], arg1: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                sendText(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                sendText(arg0: string, arg1: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                sendBinary(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocket;
                sendBinary(arg0: number[], arg1: boolean): Java.com.neovisionaries.ws.client.WebSocket;
                sendClose(): Java.com.neovisionaries.ws.client.WebSocket;
                sendClose(arg0: number): Java.com.neovisionaries.ws.client.WebSocket;
                sendClose(arg0: number, arg1: string): Java.com.neovisionaries.ws.client.WebSocket;
                sendPing(): Java.com.neovisionaries.ws.client.WebSocket;
                sendPing(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocket;
                sendPing(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                sendPong(): Java.com.neovisionaries.ws.client.WebSocket;
                sendPong(arg0: number[]): Java.com.neovisionaries.ws.client.WebSocket;
                sendPong(arg0: string): Java.com.neovisionaries.ws.client.WebSocket;
                
            }
            export interface WebSocketError extends Java.Enum<Java.com.neovisionaries.ws.client.WebSocketError> {
                // static
                readonly NOT_IN_CREATED_STATE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly SOCKET_INPUT_STREAM_FAILURE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly SOCKET_OUTPUT_STREAM_FAILURE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly OPENING_HAHDSHAKE_REQUEST_FAILURE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly OPENING_HANDSHAKE_RESPONSE_FAILURE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly STATUS_LINE_EMPTY: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly STATUS_LINE_BAD_FORMAT: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NOT_SWITCHING_PROTOCOLS: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly HTTP_HEADER_FAILURE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_UPGRADE_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_WEBSOCKET_IN_UPGRADE_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_CONNECTION_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_UPGRADE_IN_CONNECTION_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_SEC_WEBSOCKET_ACCEPT_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNEXPECTED_SEC_WEBSOCKET_ACCEPT_HEADER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly EXTENSION_PARSE_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNSUPPORTED_EXTENSION: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly EXTENSIONS_CONFLICT: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNSUPPORTED_PROTOCOL: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly INSUFFICENT_DATA: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly INVALID_PAYLOAD_LENGTH: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly TOO_LONG_PAYLOAD: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly INSUFFICIENT_MEMORY_FOR_PAYLOAD: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly INTERRUPTED_IN_READING: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly IO_ERROR_IN_READING: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly IO_ERROR_IN_WRITING: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly FLUSH_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NON_ZERO_RESERVED_BITS: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNEXPECTED_RESERVED_BIT: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly FRAME_MASKED: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNKNOWN_OPCODE: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly FRAGMENTED_CONTROL_FRAME: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNEXPECTED_CONTINUATION_FRAME: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly CONTINUATION_NOT_CLOSED: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly TOO_LONG_CONTROL_FRAME_PAYLOAD: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly MESSAGE_CONSTRUCTION_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly TEXT_MESSAGE_CONSTRUCTION_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNEXPECTED_ERROR_IN_READING_THREAD: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly UNEXPECTED_ERROR_IN_WRITING_THREAD: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly PERMESSAGE_DEFLATE_UNSUPPORTED_PARAMETER: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly PERMESSAGE_DEFLATE_INVALID_MAX_WINDOW_BITS: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly COMPRESSION_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly DECOMPRESSION_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly SOCKET_CONNECT_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly PROXY_HANDSHAKE_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly SOCKET_OVERLAY_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly SSL_HANDSHAKE_ERROR: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly NO_MORE_FRAME: Java.com.neovisionaries.ws.client.WebSocketError;
                // static
                readonly HOSTNAME_UNVERIFIED: Java.com.neovisionaries.ws.client.WebSocketError;
                
            
                // static
                values(): Java.com.neovisionaries.ws.client.WebSocketError[];
                // static
                valueOf(arg0: string): Java.com.neovisionaries.ws.client.WebSocketError;
                
            }
            export interface WebSocketState extends Java.Enum<Java.com.neovisionaries.ws.client.WebSocketState> {
                // static
                readonly CREATED: Java.com.neovisionaries.ws.client.WebSocketState;
                // static
                readonly CONNECTING: Java.com.neovisionaries.ws.client.WebSocketState;
                // static
                readonly OPEN: Java.com.neovisionaries.ws.client.WebSocketState;
                // static
                readonly CLOSING: Java.com.neovisionaries.ws.client.WebSocketState;
                // static
                readonly CLOSED: Java.com.neovisionaries.ws.client.WebSocketState;
                
            
                // static
                values(): Java.com.neovisionaries.ws.client.WebSocketState[];
                // static
                valueOf(arg0: string): Java.com.neovisionaries.ws.client.WebSocketState;
                
            }
            export interface WebSocketExtension extends Java.Object {
                // static
                readonly PERMESSAGE_DEFLATE: string;
                
            
                getName(): string;
                getParameters(): Java.java.util.Map<string, string>;
                containsParameter(arg0: string): boolean;
                getParameter(arg0: string): string;
                setParameter(arg0: string, arg1: string): Java.com.neovisionaries.ws.client.WebSocketExtension;
                toString(): string;
                // static
                parse(arg0: string): Java.com.neovisionaries.ws.client.WebSocketExtension;
                
            }
            export interface WebSocketListener extends Java.Interface {
                
            
                onStateChanged(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketState): void;
                onConnected(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.java.util.Map<string, Java.java.util.List<string>>): void;
                onConnectError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException): void;
                onDisconnected(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame, arg2: Java.com.neovisionaries.ws.client.WebSocketFrame, arg3: boolean): void;
                onFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onContinuationFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onTextFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onBinaryFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onCloseFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onPingFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onPongFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onTextMessage(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: string): void;
                onTextMessage(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: number[]): void;
                onBinaryMessage(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: number[]): void;
                onSendingFrame(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onFrameSent(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onFrameUnsent(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onThreadCreated(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.ThreadType, arg2: Java.Thread): void;
                onThreadStarted(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.ThreadType, arg2: Java.Thread): void;
                onThreadStopping(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.ThreadType, arg2: Java.Thread): void;
                onError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException): void;
                onFrameError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException, arg2: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onMessageError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException, arg2: Java.java.util.List<Java.com.neovisionaries.ws.client.WebSocketFrame>): void;
                onMessageDecompressionError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException, arg2: number[]): void;
                onTextMessageError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException, arg2: number[]): void;
                onSendError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException, arg2: Java.com.neovisionaries.ws.client.WebSocketFrame): void;
                onUnexpectedError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.com.neovisionaries.ws.client.WebSocketException): void;
                handleCallbackError(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: Java.Throwable): void;
                onSendingHandshake(arg0: Java.com.neovisionaries.ws.client.WebSocket, arg1: string, arg2: Java.java.util.List<string[]>): void;
                
            }
            export interface PayloadGenerator extends Java.Interface {
                
            
                generate(): number[];
                
            }
            export interface ThreadType extends Java.Enum<Java.com.neovisionaries.ws.client.ThreadType> {
                // static
                readonly READING_THREAD: Java.com.neovisionaries.ws.client.ThreadType;
                // static
                readonly WRITING_THREAD: Java.com.neovisionaries.ws.client.ThreadType;
                // static
                readonly CONNECT_THREAD: Java.com.neovisionaries.ws.client.ThreadType;
                // static
                readonly FINISH_THREAD: Java.com.neovisionaries.ws.client.ThreadType;
                
            
                // static
                values(): Java.com.neovisionaries.ws.client.ThreadType[];
                // static
                valueOf(arg0: string): Java.com.neovisionaries.ws.client.ThreadType;
                
            }
        }
    }

    export namespace reflect {
    
        export interface Field extends Java.reflect.AccessibleObject, Java.reflect.Member {
            
        
            setAccessible(arg0: boolean): void;
            getDeclaringClass(): Java.Class<any>;
            getName(): string;
            getModifiers(): number;
            isEnumConstant(): boolean;
            isSynthetic(): boolean;
            getType(): Java.Class<any>;
            getGenericType(): Java.reflect.Type;
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            toGenericString(): string;
            get(arg0: Java.Object): Java.Object;
            getBoolean(arg0: Java.Object): boolean;
            getByte(arg0: Java.Object): number;
            getChar(arg0: Java.Object): number;
            getShort(arg0: Java.Object): number;
            getInt(arg0: Java.Object): number;
            getLong(arg0: Java.Object): number;
            getFloat(arg0: Java.Object): number;
            getDouble(arg0: Java.Object): number;
            set(arg0: Java.Object, arg1: Java.Object): void;
            setBoolean(arg0: Java.Object, arg1: boolean): void;
            setByte(arg0: Java.Object, arg1: number): void;
            setChar(arg0: Java.Object, arg1: number): void;
            setShort(arg0: Java.Object, arg1: number): void;
            setInt(arg0: Java.Object, arg1: number): void;
            setLong(arg0: Java.Object, arg1: number): void;
            setFloat(arg0: Java.Object, arg1: number): void;
            setDouble(arg0: Java.Object, arg1: number): void;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            getAnnotatedType(): Java.reflect.AnnotatedType;
            
        }
        export interface Type extends Java.Interface {
            
        
            getTypeName(): string;
            
        }
        export interface Executable extends Java.reflect.AccessibleObject, Java.reflect.Member, Java.reflect.GenericDeclaration {
            
        
            getDeclaringClass(): Java.Class<any>;
            getName(): string;
            getModifiers(): number;
            getTypeParameters(): Java.reflect.TypeVariable<any>[];
            getParameterTypes(): Java.Class<any>[];
            getParameterCount(): number;
            getGenericParameterTypes(): Java.reflect.Type[];
            getParameters(): Java.reflect.Parameter[];
            getExceptionTypes(): Java.Class<any>[];
            getGenericExceptionTypes(): Java.reflect.Type[];
            toGenericString(): string;
            isVarArgs(): boolean;
            isSynthetic(): boolean;
            getParameterAnnotations(): Java.annotation.Annotation[][];
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            getAnnotatedReturnType(): Java.reflect.AnnotatedType;
            getAnnotatedReceiverType(): Java.reflect.AnnotatedType;
            getAnnotatedParameterTypes(): Java.reflect.AnnotatedType[];
            getAnnotatedExceptionTypes(): Java.reflect.AnnotatedType[];
            
        }
        export interface Method extends Java.reflect.Executable {
            
        
            setAccessible(arg0: boolean): void;
            getDeclaringClass(): Java.Class<any>;
            getName(): string;
            getModifiers(): number;
            getTypeParameters(): Java.reflect.TypeVariable<Java.reflect.Method>[];
            getReturnType(): Java.Class<any>;
            getGenericReturnType(): Java.reflect.Type;
            getParameterTypes(): Java.Class<any>[];
            getParameterCount(): number;
            getGenericParameterTypes(): Java.reflect.Type[];
            getExceptionTypes(): Java.Class<any>[];
            getGenericExceptionTypes(): Java.reflect.Type[];
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            toGenericString(): string;
            invoke(arg0: Java.Object, arg1: Java.Object[]): Java.Object;
            isBridge(): boolean;
            isVarArgs(): boolean;
            isSynthetic(): boolean;
            isDefault(): boolean;
            getDefaultValue(): Java.Object;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            getParameterAnnotations(): Java.annotation.Annotation[][];
            getAnnotatedReturnType(): Java.reflect.AnnotatedType;
            
        }
        export interface AnnotatedType extends Java.Interface, Java.reflect.AnnotatedElement {
            
        
            getAnnotatedOwnerType(): Java.reflect.AnnotatedType;
            getType(): Java.reflect.Type;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getAnnotations(): Java.annotation.Annotation[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            
        }
        export interface Member extends Java.Interface {
            // static
            readonly PUBLIC: number;
            // static
            readonly DECLARED: number;
            
        
            getDeclaringClass(): Java.Class<any>;
            getName(): string;
            getModifiers(): number;
            isSynthetic(): boolean;
            
        }
        export interface AccessibleObject extends Java.Object, Java.reflect.AnnotatedElement {
            
        
            // static
            setAccessible(arg0: Java.reflect.AccessibleObject[], arg1: boolean): void;
            setAccessible(arg0: boolean): void;
            trySetAccessible(): boolean;
            isAccessible(): boolean;
            canAccess(arg0: Java.Object): boolean;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            isAnnotationPresent(arg0: Java.Class<any>): boolean;
            getAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getAnnotations(): Java.annotation.Annotation[];
            getDeclaredAnnotation<T>(arg0: Java.Class<T>): T;
            getDeclaredAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            
        }
        export interface TypeVariable<D> extends Java.Interface, Java.reflect.Type, Java.reflect.AnnotatedElement {
            
        
            getBounds(): Java.reflect.Type[];
            getGenericDeclaration(): D;
            getName(): string;
            getAnnotatedBounds(): Java.reflect.AnnotatedType[];
            
        }
        export interface Parameter extends Java.Object, Java.reflect.AnnotatedElement {
            
        
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            isNamePresent(): boolean;
            toString(): string;
            getDeclaringExecutable(): Java.reflect.Executable;
            getModifiers(): number;
            getName(): string;
            getParameterizedType(): Java.reflect.Type;
            getType(): Java.Class<any>;
            getAnnotatedType(): Java.reflect.AnnotatedType;
            isImplicit(): boolean;
            isSynthetic(): boolean;
            isVarArgs(): boolean;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            getDeclaredAnnotation<T>(arg0: Java.Class<T>): T;
            getDeclaredAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getAnnotations(): Java.annotation.Annotation[];
            
        }
        export interface GenericDeclaration extends Java.Interface, Java.reflect.AnnotatedElement {
            
        
            getTypeParameters(): Java.reflect.TypeVariable<any>[];
            
        }
        export interface AnnotatedElement extends Java.Interface {
            
        
            isAnnotationPresent(arg0: Java.Class<any>): boolean;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getAnnotations(): Java.annotation.Annotation[];
            getAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotation<T>(arg0: Java.Class<T>): T;
            getDeclaredAnnotationsByType<T>(arg0: Java.Class<T>): T[];
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            
        }
        export interface Constructor<T> extends Java.reflect.Executable {
            
        
            setAccessible(arg0: boolean): void;
            getDeclaringClass(): Java.Class<T>;
            getName(): string;
            getModifiers(): number;
            getTypeParameters(): Java.reflect.TypeVariable<Java.reflect.Constructor<T>>[];
            getParameterTypes(): Java.Class<any>[];
            getParameterCount(): number;
            getGenericParameterTypes(): Java.reflect.Type[];
            getExceptionTypes(): Java.Class<any>[];
            getGenericExceptionTypes(): Java.reflect.Type[];
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            toGenericString(): string;
            newInstance(arg0: Java.Object[]): T;
            isVarArgs(): boolean;
            isSynthetic(): boolean;
            getAnnotation<T>(arg0: Java.Class<T>): T;
            getDeclaredAnnotations(): Java.annotation.Annotation[];
            getParameterAnnotations(): Java.annotation.Annotation[][];
            getAnnotatedReturnType(): Java.reflect.AnnotatedType;
            getAnnotatedReceiverType(): Java.reflect.AnnotatedType;
            
        }
    }

    export namespace org {
    
    
        export namespace graalvm {
        
        
            export namespace polyglot {
            
                export interface Context extends Java.Object, Java.AutoCloseable {
                    
                
                    getEngine(): Java.org.graalvm.polyglot.Engine;
                    eval(arg0: Java.org.graalvm.polyglot.Source): Java.org.graalvm.polyglot.Value;
                    eval(arg0: string, arg1: Java.CharSequence): Java.org.graalvm.polyglot.Value;
                    parse(arg0: Java.org.graalvm.polyglot.Source): Java.org.graalvm.polyglot.Value;
                    parse(arg0: string, arg1: Java.CharSequence): Java.org.graalvm.polyglot.Value;
                    getPolyglotBindings(): Java.org.graalvm.polyglot.Value;
                    getBindings(arg0: string): Java.org.graalvm.polyglot.Value;
                    initialize(arg0: string): boolean;
                    resetLimits(): void;
                    asValue(arg0: Java.Object): Java.org.graalvm.polyglot.Value;
                    enter(): void;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    leave(): void;
                    close(arg0: boolean): void;
                    close(): void;
                    interrupt(arg0: Java.java.time.Duration): void;
                    safepoint(): void;
                    // static
                    getCurrent(): Java.org.graalvm.polyglot.Context;
                    // static
                    create(arg0: string[]): Java.org.graalvm.polyglot.Context;
                    // static
                    newBuilder(arg0: string[]): Java.org.graalvm.polyglot.Context$Builder;
                    
                }
                export interface Context$Builder extends Java.Object {
                    
                
                    engine(arg0: Java.org.graalvm.polyglot.Engine): Java.org.graalvm.polyglot.Context$Builder;
                    out(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Context$Builder;
                    err(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Context$Builder;
                    in(arg0: Java.java.io.InputStream): Java.org.graalvm.polyglot.Context$Builder;
                    allowHostAccess(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowHostAccess(arg0: Java.org.graalvm.polyglot.HostAccess): Java.org.graalvm.polyglot.Context$Builder;
                    allowNativeAccess(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowCreateThread(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowAllAccess(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowHostClassLoading(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowHostClassLookup(arg0: Java.java.util._function.Predicate<string>): Java.org.graalvm.polyglot.Context$Builder;
                    allowExperimentalOptions(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    allowPolyglotAccess(arg0: Java.org.graalvm.polyglot.PolyglotAccess): Java.org.graalvm.polyglot.Context$Builder;
                    allowValueSharing(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    hostClassFilter(arg0: Java.java.util._function.Predicate<string>): Java.org.graalvm.polyglot.Context$Builder;
                    option(arg0: string, arg1: string): Java.org.graalvm.polyglot.Context$Builder;
                    options(arg0: Java.java.util.Map<string, string>): Java.org.graalvm.polyglot.Context$Builder;
                    arguments(arg0: string, arg1: string[]): Java.org.graalvm.polyglot.Context$Builder;
                    allowIO(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    fileSystem(arg0: Java.org.graalvm.polyglot.io.FileSystem): Java.org.graalvm.polyglot.Context$Builder;
                    serverTransport(arg0: Java.org.graalvm.polyglot.io.MessageTransport): Java.org.graalvm.polyglot.Context$Builder;
                    logHandler(arg0: Java.java.util.logging.Handler): Java.org.graalvm.polyglot.Context$Builder;
                    timeZone(arg0: Java.java.time.ZoneId): Java.org.graalvm.polyglot.Context$Builder;
                    logHandler(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Context$Builder;
                    allowCreateProcess(arg0: boolean): Java.org.graalvm.polyglot.Context$Builder;
                    processHandler(arg0: Java.org.graalvm.polyglot.io.ProcessHandler): Java.org.graalvm.polyglot.Context$Builder;
                    resourceLimits(arg0: Java.org.graalvm.polyglot.ResourceLimits): Java.org.graalvm.polyglot.Context$Builder;
                    allowEnvironmentAccess(arg0: Java.org.graalvm.polyglot.EnvironmentAccess): Java.org.graalvm.polyglot.Context$Builder;
                    environment(arg0: string, arg1: string): Java.org.graalvm.polyglot.Context$Builder;
                    environment(arg0: Java.java.util.Map<string, string>): Java.org.graalvm.polyglot.Context$Builder;
                    currentWorkingDirectory(arg0: Java.java.nio.file.Path): Java.org.graalvm.polyglot.Context$Builder;
                    hostClassLoader(arg0: Java.ClassLoader): Java.org.graalvm.polyglot.Context$Builder;
                    build(): Java.org.graalvm.polyglot.Context;
                    
                }
                export interface Value extends Java.org.graalvm.polyglot.AbstractValue {
                    
                
                    getMetaObject(): Java.org.graalvm.polyglot.Value;
                    isMetaObject(): boolean;
                    getMetaQualifiedName(): string;
                    getMetaSimpleName(): string;
                    isMetaInstance(arg0: Java.Object): boolean;
                    hasArrayElements(): boolean;
                    getArrayElement(arg0: number): Java.org.graalvm.polyglot.Value;
                    setArrayElement(arg0: number, arg1: Java.Object): void;
                    removeArrayElement(arg0: number): boolean;
                    getArraySize(): number;
                    hasBufferElements(): boolean;
                    isBufferWritable(): boolean;
                    getBufferSize(): number;
                    readBufferByte(arg0: number): number;
                    writeBufferByte(arg0: number, arg1: number): void;
                    readBufferShort(arg0: Java.java.nio.ByteOrder, arg1: number): number;
                    writeBufferShort(arg0: Java.java.nio.ByteOrder, arg1: number, arg2: number): void;
                    readBufferInt(arg0: Java.java.nio.ByteOrder, arg1: number): number;
                    writeBufferInt(arg0: Java.java.nio.ByteOrder, arg1: number, arg2: number): void;
                    readBufferLong(arg0: Java.java.nio.ByteOrder, arg1: number): number;
                    writeBufferLong(arg0: Java.java.nio.ByteOrder, arg1: number, arg2: number): void;
                    readBufferFloat(arg0: Java.java.nio.ByteOrder, arg1: number): number;
                    writeBufferFloat(arg0: Java.java.nio.ByteOrder, arg1: number, arg2: number): void;
                    readBufferDouble(arg0: Java.java.nio.ByteOrder, arg1: number): number;
                    writeBufferDouble(arg0: Java.java.nio.ByteOrder, arg1: number, arg2: number): void;
                    hasMembers(): boolean;
                    hasMember(arg0: string): boolean;
                    getMember(arg0: string): Java.org.graalvm.polyglot.Value;
                    getMemberKeys(): Java.java.util.Set<string>;
                    putMember(arg0: string, arg1: Java.Object): void;
                    removeMember(arg0: string): boolean;
                    canExecute(): boolean;
                    execute(arg0: Java.Object[]): Java.org.graalvm.polyglot.Value;
                    executeVoid(arg0: Java.Object[]): void;
                    canInstantiate(): boolean;
                    newInstance(arg0: Java.Object[]): Java.org.graalvm.polyglot.Value;
                    canInvokeMember(arg0: string): boolean;
                    invokeMember(arg0: string, arg1: Java.Object[]): Java.org.graalvm.polyglot.Value;
                    isString(): boolean;
                    asString(): string;
                    fitsInInt(): boolean;
                    asInt(): number;
                    isBoolean(): boolean;
                    asBoolean(): boolean;
                    isNumber(): boolean;
                    fitsInLong(): boolean;
                    asLong(): number;
                    fitsInDouble(): boolean;
                    asDouble(): number;
                    fitsInFloat(): boolean;
                    asFloat(): number;
                    fitsInByte(): boolean;
                    asByte(): number;
                    fitsInShort(): boolean;
                    asShort(): number;
                    isNull(): boolean;
                    isNativePointer(): boolean;
                    asNativePointer(): number;
                    isHostObject(): boolean;
                    asHostObject<T>(): T;
                    isProxyObject(): boolean;
                    asProxyObject<T>(): T;
                    as<T>(arg0: Java.Class<T>): T;
                    as<T>(arg0: Java.org.graalvm.polyglot.TypeLiteral<T>): T;
                    toString(): string;
                    getSourceLocation(): Java.org.graalvm.polyglot.SourceSection;
                    isDate(): boolean;
                    asDate(): Java.java.time.LocalDate;
                    isTime(): boolean;
                    asTime(): Java.java.time.LocalTime;
                    isInstant(): boolean;
                    asInstant(): Java.java.time.Instant;
                    isTimeZone(): boolean;
                    asTimeZone(): Java.java.time.ZoneId;
                    isDuration(): boolean;
                    asDuration(): Java.java.time.Duration;
                    isException(): boolean;
                    throwException(): Java.RuntimeException;
                    getContext(): Java.org.graalvm.polyglot.Context;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    hasIterator(): boolean;
                    getIterator(): Java.org.graalvm.polyglot.Value;
                    isIterator(): boolean;
                    hasIteratorNextElement(): boolean;
                    getIteratorNextElement(): Java.org.graalvm.polyglot.Value;
                    hasHashEntries(): boolean;
                    getHashSize(): number;
                    hasHashEntry(arg0: Java.Object): boolean;
                    getHashValue(arg0: Java.Object): Java.org.graalvm.polyglot.Value;
                    getHashValueOrDefault(arg0: Java.Object, arg1: Java.Object): Java.org.graalvm.polyglot.Value;
                    putHashEntry(arg0: Java.Object, arg1: Java.Object): void;
                    removeHashEntry(arg0: Java.Object): boolean;
                    getHashEntriesIterator(): Java.org.graalvm.polyglot.Value;
                    getHashKeysIterator(): Java.org.graalvm.polyglot.Value;
                    getHashValuesIterator(): Java.org.graalvm.polyglot.Value;
                    // static
                    asValue(arg0: Java.Object): Java.org.graalvm.polyglot.Value;
                    pin(): void;
                    
                }
                export interface Source extends Java.Object {
                    
                
                    getLanguage(): string;
                    getName(): string;
                    getPath(): string;
                    getURL(): Java.java.net.URL;
                    getURI(): Java.java.net.URI;
                    isInteractive(): boolean;
                    isInternal(): boolean;
                    getReader(): Java.java.io.Reader;
                    getInputStream(): Java.java.io.InputStream;
                    getLength(): number;
                    getCharacters(): Java.CharSequence;
                    getMimeType(): string;
                    getCharacters(arg0: number): Java.CharSequence;
                    getBytes(): Java.org.graalvm.polyglot.io.ByteSequence;
                    hasCharacters(): boolean;
                    hasBytes(): boolean;
                    getLineCount(): number;
                    getLineNumber(arg0: number): number;
                    getColumnNumber(arg0: number): number;
                    getLineStartOffset(arg0: number): number;
                    getLineLength(arg0: number): number;
                    toString(): string;
                    hashCode(): number;
                    equals(arg0: Java.Object): boolean;
                    // static
                    newBuilder(arg0: string, arg1: Java.CharSequence, arg2: string): Java.org.graalvm.polyglot.Source$Builder;
                    // static
                    newBuilder(arg0: string, arg1: Java.org.graalvm.polyglot.io.ByteSequence, arg2: string): Java.org.graalvm.polyglot.Source$Builder;
                    // static
                    newBuilder(arg0: string, arg1: Java.java.io.File): Java.org.graalvm.polyglot.Source$Builder;
                    // static
                    newBuilder(arg0: string, arg1: Java.java.net.URL): Java.org.graalvm.polyglot.Source$Builder;
                    // static
                    newBuilder(arg0: string, arg1: Java.java.io.Reader, arg2: string): Java.org.graalvm.polyglot.Source$Builder;
                    // static
                    create(arg0: string, arg1: Java.CharSequence): Java.org.graalvm.polyglot.Source;
                    // static
                    findLanguage(arg0: Java.java.io.File): string;
                    // static
                    findLanguage(arg0: Java.java.net.URL): string;
                    // static
                    findMimeType(arg0: Java.java.io.File): string;
                    // static
                    findMimeType(arg0: Java.java.net.URL): string;
                    // static
                    findLanguage(arg0: string): string;
                    
                }
                export interface Engine extends Java.Object, Java.AutoCloseable {
                    
                
                    getLanguages(): Java.java.util.Map<string, Java.org.graalvm.polyglot.Language>;
                    getInstruments(): Java.java.util.Map<string, Java.org.graalvm.polyglot.Instrument>;
                    getOptions(): Java.org.graalvm.options.OptionDescriptors;
                    getVersion(): string;
                    close(arg0: boolean): void;
                    close(): void;
                    getImplementationName(): string;
                    // static
                    create(): Java.org.graalvm.polyglot.Engine;
                    // static
                    newBuilder(): Java.org.graalvm.polyglot.Engine$Builder;
                    // static
                    findHome(): Java.java.nio.file.Path;
                    getCachedSources(): Java.java.util.Set<Java.org.graalvm.polyglot.Source>;
                    
                }
                export interface TypeLiteral<T> extends Java.Object {
                    
                
                    getType(): Java.reflect.Type;
                    getRawType(): Java.Class<T>;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface EnvironmentAccess extends Java.Object {
                    // static
                    readonly NONE: Java.org.graalvm.polyglot.EnvironmentAccess;
                    // static
                    readonly INHERIT: Java.org.graalvm.polyglot.EnvironmentAccess;
                    
                
                    
                }
                export interface HostAccess extends Java.Object {
                    // static
                    readonly EXPLICIT: Java.org.graalvm.polyglot.HostAccess;
                    // static
                    readonly SCOPED: Java.org.graalvm.polyglot.HostAccess;
                    // static
                    readonly ALL: Java.org.graalvm.polyglot.HostAccess;
                    // static
                    readonly NONE: Java.org.graalvm.polyglot.HostAccess;
                    
                
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    // static
                    newBuilder(): Java.org.graalvm.polyglot.HostAccess$Builder;
                    // static
                    newBuilder(arg0: Java.org.graalvm.polyglot.HostAccess): Java.org.graalvm.polyglot.HostAccess$Builder;
                    toString(): string;
                    
                }
                export interface Instrument extends Java.Object {
                    
                
                    getId(): string;
                    getName(): string;
                    getOptions(): Java.org.graalvm.options.OptionDescriptors;
                    getVersion(): string;
                    lookup<T>(arg0: Java.Class<T>): T;
                    
                }
                export interface ResourceLimits extends Java.Object {
                    
                
                    // static
                    newBuilder(): Java.org.graalvm.polyglot.ResourceLimits$Builder;
                    
                }
                export interface Source$Builder extends Java.Object {
                    
                
                    name(arg0: string): Java.org.graalvm.polyglot.Source$Builder;
                    content(arg0: string): Java.org.graalvm.polyglot.Source$Builder;
                    content(arg0: Java.CharSequence): Java.org.graalvm.polyglot.Source$Builder;
                    content(arg0: Java.org.graalvm.polyglot.io.ByteSequence): Java.org.graalvm.polyglot.Source$Builder;
                    mimeType(arg0: string): Java.org.graalvm.polyglot.Source$Builder;
                    interactive(arg0: boolean): Java.org.graalvm.polyglot.Source$Builder;
                    internal(arg0: boolean): Java.org.graalvm.polyglot.Source$Builder;
                    cached(arg0: boolean): Java.org.graalvm.polyglot.Source$Builder;
                    uri(arg0: Java.java.net.URI): Java.org.graalvm.polyglot.Source$Builder;
                    encoding(arg0: Java.java.nio.charset.Charset): Java.org.graalvm.polyglot.Source$Builder;
                    build(): Java.org.graalvm.polyglot.Source;
                    buildLiteral(): Java.org.graalvm.polyglot.Source;
                    
                }
                export interface AbstractValue extends Java.Object {
                    
                
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface Language extends Java.Object {
                    
                
                    getId(): string;
                    getName(): string;
                    getImplementationName(): string;
                    getVersion(): string;
                    isInteractive(): boolean;
                    getOptions(): Java.org.graalvm.options.OptionDescriptors;
                    getDefaultMimeType(): string;
                    getMimeTypes(): Java.java.util.Set<string>;
                    
                }
                export interface Engine$Builder extends Java.Object {
                    
                
                    out(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Engine$Builder;
                    err(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Engine$Builder;
                    in(arg0: Java.java.io.InputStream): Java.org.graalvm.polyglot.Engine$Builder;
                    allowExperimentalOptions(arg0: boolean): Java.org.graalvm.polyglot.Engine$Builder;
                    useSystemProperties(arg0: boolean): Java.org.graalvm.polyglot.Engine$Builder;
                    option(arg0: string, arg1: string): Java.org.graalvm.polyglot.Engine$Builder;
                    options(arg0: Java.java.util.Map<string, string>): Java.org.graalvm.polyglot.Engine$Builder;
                    serverTransport(arg0: Java.org.graalvm.polyglot.io.MessageTransport): Java.org.graalvm.polyglot.Engine$Builder;
                    logHandler(arg0: Java.java.util.logging.Handler): Java.org.graalvm.polyglot.Engine$Builder;
                    logHandler(arg0: Java.java.io.OutputStream): Java.org.graalvm.polyglot.Engine$Builder;
                    build(): Java.org.graalvm.polyglot.Engine;
                    
                }
                export interface PolyglotAccess extends Java.Object {
                    // static
                    readonly NONE: Java.org.graalvm.polyglot.PolyglotAccess;
                    // static
                    readonly ALL: Java.org.graalvm.polyglot.PolyglotAccess;
                    
                
                    // static
                    newBuilder(): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    
                }
                export interface SourceSection extends Java.Object {
                    
                
                    isAvailable(): boolean;
                    hasLines(): boolean;
                    hasColumns(): boolean;
                    hasCharIndex(): boolean;
                    getSource(): Java.org.graalvm.polyglot.Source;
                    getStartLine(): number;
                    getStartColumn(): number;
                    getEndLine(): number;
                    getEndColumn(): number;
                    getCharIndex(): number;
                    getCharLength(): number;
                    getCharEndIndex(): number;
                    getCode(): Java.CharSequence;
                    getCharacters(): Java.CharSequence;
                    toString(): string;
                    hashCode(): number;
                    equals(arg0: Java.Object): boolean;
                    
                }
                export interface PolyglotAccess$Builder extends Java.Object {
                    
                
                    allowEvalBetween(arg0: string[]): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    denyEvalBetween(arg0: string[]): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    allowEval(arg0: string, arg1: string): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    denyEval(arg0: string, arg1: string): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    allowBindingsAccess(arg0: string): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    denyBindingsAccess(arg0: string): Java.org.graalvm.polyglot.PolyglotAccess$Builder;
                    build(): Java.org.graalvm.polyglot.PolyglotAccess;
                    
                }
                export interface HostAccess$Builder extends Java.Object {
                    
                
                    allowAccessAnnotatedBy(arg0: Java.Class<any>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowPublicAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowAccess(arg0: Java.reflect.Executable): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowAccess(arg0: Java.reflect.Field): Java.org.graalvm.polyglot.HostAccess$Builder;
                    denyAccess(arg0: Java.Class<any>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    denyAccess(arg0: Java.Class<any>, arg1: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowAllImplementations(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowAllClassImplementations(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowImplementationsAnnotatedBy(arg0: Java.Class<any>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowImplementations(arg0: Java.Class<any>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowArrayAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowListAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowIterableAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowIteratorAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowMapAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    allowBufferAccess(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    targetTypeMapping<S, T>(arg0: Java.Class<S>, arg1: Java.Class<T>, arg2: Java.java.util._function.Predicate<S>, arg3: Java.java.util._function.Function<S, T>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    targetTypeMapping<S, T>(arg0: Java.Class<S>, arg1: Java.Class<T>, arg2: Java.java.util._function.Predicate<S>, arg3: Java.java.util._function.Function<S, T>, arg4: Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence): Java.org.graalvm.polyglot.HostAccess$Builder;
                    methodScoping(arg0: boolean): Java.org.graalvm.polyglot.HostAccess$Builder;
                    disableMethodScopingAnnotatedBy(arg0: Java.Class<any>): Java.org.graalvm.polyglot.HostAccess$Builder;
                    disableMethodScoping(arg0: Java.reflect.Executable): Java.org.graalvm.polyglot.HostAccess$Builder;
                    build(): Java.org.graalvm.polyglot.HostAccess;
                    
                }
                export interface ResourceLimits$Builder extends Java.Object {
                    
                
                    statementLimit(arg0: number, arg1: Java.java.util._function.Predicate<Java.org.graalvm.polyglot.Source>): Java.org.graalvm.polyglot.ResourceLimits$Builder;
                    onLimit(arg0: Java.java.util._function.Consumer<Java.org.graalvm.polyglot.ResourceLimitEvent>): Java.org.graalvm.polyglot.ResourceLimits$Builder;
                    build(): Java.org.graalvm.polyglot.ResourceLimits;
                    
                }
                export interface ResourceLimitEvent extends Java.Object {
                    
                
                    getContext(): Java.org.graalvm.polyglot.Context;
                    toString(): string;
                    
                }
                export interface HostAccess$TargetMappingPrecedence extends Java.Enum<Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence> {
                    // static
                    readonly HIGHEST: Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence;
                    // static
                    readonly HIGH: Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence;
                    // static
                    readonly LOW: Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence;
                    // static
                    readonly LOWEST: Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence;
                    
                
                    // static
                    values(): Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence[];
                    // static
                    valueOf(arg0: string): Java.org.graalvm.polyglot.HostAccess$TargetMappingPrecedence;
                    
                }
            
                export namespace io {
                
                    export interface FileSystem extends Java.Interface {
                        
                    
                        parsePath(arg0: Java.java.net.URI): Java.java.nio.file.Path;
                        parsePath(arg0: string): Java.java.nio.file.Path;
                        checkAccess(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.nio.file.LinkOption[]): void;
                        createDirectory(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.attribute.FileAttribute<any>[]): void;
                        delete(arg0: Java.java.nio.file.Path): void;
                        newByteChannel(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.SeekableByteChannel;
                        newDirectoryStream(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.DirectoryStream$Filter<any>): Java.java.nio.file.DirectoryStream<Java.java.nio.file.Path>;
                        toAbsolutePath(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                        toRealPath(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.LinkOption[]): Java.java.nio.file.Path;
                        readAttributes(arg0: Java.java.nio.file.Path, arg1: string, arg2: Java.java.nio.file.LinkOption[]): Java.java.util.Map<string, Java.Object>;
                        setAttribute(arg0: Java.java.nio.file.Path, arg1: string, arg2: Java.Object, arg3: Java.java.nio.file.LinkOption[]): void;
                        copy(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.CopyOption[]): void;
                        move(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.CopyOption[]): void;
                        createLink(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path): void;
                        createSymbolicLink(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): void;
                        readSymbolicLink(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                        setCurrentWorkingDirectory(arg0: Java.java.nio.file.Path): void;
                        getSeparator(): string;
                        getPathSeparator(): string;
                        getMimeType(arg0: Java.java.nio.file.Path): string;
                        getEncoding(arg0: Java.java.nio.file.Path): Java.java.nio.charset.Charset;
                        getTempDirectory(): Java.java.nio.file.Path;
                        isSameFile(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.LinkOption[]): boolean;
                        // static
                        newDefaultFileSystem(): Java.org.graalvm.polyglot.io.FileSystem;
                        
                    }
                    export interface MessageTransport extends Java.Interface {
                        
                    
                        open(arg0: Java.java.net.URI, arg1: Java.org.graalvm.polyglot.io.MessageEndpoint): Java.org.graalvm.polyglot.io.MessageEndpoint;
                        
                    }
                    export interface ByteSequence extends Java.Interface {
                        
                    
                        length(): number;
                        byteAt(arg0: number): number;
                        subSequence(arg0: number, arg1: number): Java.org.graalvm.polyglot.io.ByteSequence;
                        toByteArray(): number[];
                        bytes(): Java.java.util.stream.IntStream;
                        // static
                        create(arg0: number[]): Java.org.graalvm.polyglot.io.ByteSequence;
                        
                    }
                    export interface ProcessHandler extends Java.Interface {
                        
                    
                        start(arg0: Java.org.graalvm.polyglot.io.ProcessHandler$ProcessCommand): Java.Process;
                        
                    }
                    export interface ProcessHandler$ProcessCommand extends Java.Object {
                        
                    
                        getCommand(): Java.java.util.List<string>;
                        getDirectory(): string;
                        getEnvironment(): Java.java.util.Map<string, string>;
                        isRedirectErrorStream(): boolean;
                        getInputRedirect(): Java.org.graalvm.polyglot.io.ProcessHandler$Redirect;
                        getOutputRedirect(): Java.org.graalvm.polyglot.io.ProcessHandler$Redirect;
                        getErrorRedirect(): Java.org.graalvm.polyglot.io.ProcessHandler$Redirect;
                        
                    }
                    export interface MessageEndpoint extends Java.Interface {
                        
                    
                        sendText(arg0: string): void;
                        sendBinary(arg0: Java.java.nio.ByteBuffer): void;
                        sendPing(arg0: Java.java.nio.ByteBuffer): void;
                        sendPong(arg0: Java.java.nio.ByteBuffer): void;
                        sendClose(): void;
                        
                    }
                    export interface ProcessHandler$Redirect extends Java.Object {
                        // static
                        readonly PIPE: Java.org.graalvm.polyglot.io.ProcessHandler$Redirect;
                        // static
                        readonly INHERIT: Java.org.graalvm.polyglot.io.ProcessHandler$Redirect;
                        
                    
                        toString(): string;
                        hashCode(): number;
                        equals(arg0: Java.Object): boolean;
                        
                    }
                }
            }
        
            export namespace options {
            
                export interface OptionDescriptors extends Java.Interface, Java.Iterable<Java.org.graalvm.options.OptionDescriptor> {
                    // static
                    readonly EMPTY: Java.org.graalvm.options.OptionDescriptors;
                    
                
                    get(arg0: string): Java.org.graalvm.options.OptionDescriptor;
                    // static
                    createUnion(arg0: Java.org.graalvm.options.OptionDescriptors[]): Java.org.graalvm.options.OptionDescriptors;
                    iterator(): Java.java.util.Iterator<Java.org.graalvm.options.OptionDescriptor>;
                    // static
                    create(arg0: Java.java.util.List<Java.org.graalvm.options.OptionDescriptor>): Java.org.graalvm.options.OptionDescriptors;
                    
                }
                export interface OptionDescriptor extends Java.Object {
                    
                
                    getName(): string;
                    getKey(): Java.org.graalvm.options.OptionKey<any>;
                    isDeprecated(): boolean;
                    getDeprecationMessage(): string;
                    isOptionMap(): boolean;
                    getCategory(): Java.org.graalvm.options.OptionCategory;
                    getStability(): Java.org.graalvm.options.OptionStability;
                    getHelp(): string;
                    toString(): string;
                    hashCode(): number;
                    equals(arg0: Java.Object): boolean;
                    // static
                    newBuilder<T>(arg0: Java.org.graalvm.options.OptionKey<T>, arg1: string): Java.org.graalvm.options.OptionDescriptor$Builder;
                    
                }
                export interface OptionDescriptor$Builder extends Java.Object {
                    
                
                    category(arg0: Java.org.graalvm.options.OptionCategory): Java.org.graalvm.options.OptionDescriptor$Builder;
                    stability(arg0: Java.org.graalvm.options.OptionStability): Java.org.graalvm.options.OptionDescriptor$Builder;
                    deprecated(arg0: boolean): Java.org.graalvm.options.OptionDescriptor$Builder;
                    help(arg0: string): Java.org.graalvm.options.OptionDescriptor$Builder;
                    deprecationMessage(arg0: string): Java.org.graalvm.options.OptionDescriptor$Builder;
                    build(): Java.org.graalvm.options.OptionDescriptor;
                    
                }
                export interface OptionKey<T> extends Java.Object {
                    
                
                    // static
                    mapOf<V>(arg0: Java.Class<V>): Java.org.graalvm.options.OptionKey<Java.org.graalvm.options.OptionMap<V>>;
                    getType(): Java.org.graalvm.options.OptionType<T>;
                    getDefaultValue(): T;
                    getValue(arg0: Java.org.graalvm.options.OptionValues): T;
                    hasBeenSet(arg0: Java.org.graalvm.options.OptionValues): boolean;
                    
                }
                export interface OptionStability extends Java.Enum<Java.org.graalvm.options.OptionStability> {
                    // static
                    readonly STABLE: Java.org.graalvm.options.OptionStability;
                    // static
                    readonly EXPERIMENTAL: Java.org.graalvm.options.OptionStability;
                    
                
                    // static
                    values(): Java.org.graalvm.options.OptionStability[];
                    // static
                    valueOf(arg0: string): Java.org.graalvm.options.OptionStability;
                    
                }
                export interface OptionCategory extends Java.Enum<Java.org.graalvm.options.OptionCategory> {
                    // static
                    readonly USER: Java.org.graalvm.options.OptionCategory;
                    // static
                    readonly EXPERT: Java.org.graalvm.options.OptionCategory;
                    // static
                    readonly INTERNAL: Java.org.graalvm.options.OptionCategory;
                    
                
                    // static
                    values(): Java.org.graalvm.options.OptionCategory[];
                    // static
                    valueOf(arg0: string): Java.org.graalvm.options.OptionCategory;
                    
                }
                export interface OptionMap<T> extends Java.Object {
                    
                
                    // static
                    empty<T>(): Java.org.graalvm.options.OptionMap<T>;
                    get(arg0: string): T;
                    entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<string, T>>;
                    hashCode(): number;
                    equals(arg0: Java.Object): boolean;
                    
                }
                export interface OptionType<T> extends Java.Object {
                    
                
                    getDefaultValue(): T;
                    getName(): string;
                    convert(arg0: string): T;
                    convert(arg0: Java.Object, arg1: string, arg2: string): T;
                    validate(arg0: T): void;
                    toString(): string;
                    // static
                    defaultType<T>(arg0: T): Java.org.graalvm.options.OptionType<T>;
                    // static
                    defaultType<T>(arg0: Java.Class<T>): Java.org.graalvm.options.OptionType<T>;
                    
                }
                export interface OptionValues extends Java.Interface {
                    
                
                    getDescriptors(): Java.org.graalvm.options.OptionDescriptors;
                    set<T>(arg0: Java.org.graalvm.options.OptionKey<T>, arg1: T): void;
                    get<T>(arg0: Java.org.graalvm.options.OptionKey<T>): T;
                    hasBeenSet(arg0: Java.org.graalvm.options.OptionKey<any>): boolean;
                    hasSetOptions(): boolean;
                    
                }
            }
        }
    
        export namespace apache.logging.log4j {
        
            export interface Logger extends Java.Interface {
                
            
                catching(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.Throwable): void;
                catching(arg0: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.message.Message): void;
                debug(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                debug(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                debug(arg0: Java.CharSequence): void;
                debug(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                debug(arg0: Java.Object): void;
                debug(arg0: Java.Object, arg1: Java.Throwable): void;
                debug(arg0: string): void;
                debug(arg0: string, arg1: Java.Object[]): void;
                debug(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                debug(arg0: string, arg1: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                debug(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                debug(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                debug(arg0: string, arg1: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                debug(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                entry(): void;
                entry(arg0: Java.Object[]): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.message.Message): void;
                error(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                error(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                error(arg0: Java.CharSequence): void;
                error(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                error(arg0: Java.Object): void;
                error(arg0: Java.Object, arg1: Java.Throwable): void;
                error(arg0: string): void;
                error(arg0: string, arg1: Java.Object[]): void;
                error(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                error(arg0: string, arg1: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                error(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                error(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                error(arg0: string, arg1: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                error(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                exit(): void;
                exit<R>(arg0: R): R;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.message.Message): void;
                fatal(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                fatal(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                fatal(arg0: Java.CharSequence): void;
                fatal(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                fatal(arg0: Java.Object): void;
                fatal(arg0: Java.Object, arg1: Java.Throwable): void;
                fatal(arg0: string): void;
                fatal(arg0: string, arg1: Java.Object[]): void;
                fatal(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                fatal(arg0: string, arg1: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                fatal(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                fatal(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                fatal(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                getLevel(): Java.org.apache.logging.log4j.Level;
                getMessageFactory<MF>(): MF;
                getName(): string;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.message.Message): void;
                info(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                info(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                info(arg0: Java.CharSequence): void;
                info(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                info(arg0: Java.Object): void;
                info(arg0: Java.Object, arg1: Java.Throwable): void;
                info(arg0: string): void;
                info(arg0: string, arg1: Java.Object[]): void;
                info(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                info(arg0: string, arg1: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                info(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                info(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                info(arg0: string, arg1: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                info(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                isDebugEnabled(): boolean;
                isDebugEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isEnabled(arg0: Java.org.apache.logging.log4j.Level): boolean;
                isEnabled(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker): boolean;
                isErrorEnabled(): boolean;
                isErrorEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isFatalEnabled(): boolean;
                isFatalEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isInfoEnabled(): boolean;
                isInfoEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isTraceEnabled(): boolean;
                isTraceEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isWarnEnabled(): boolean;
                isWarnEnabled(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.message.Message): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.message.Message, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.util.MessageSupplier, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.CharSequence): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.CharSequence, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.Object, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object[]): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: Java.org.apache.logging.log4j.util.Supplier<any>, arg3: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.message.Message): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.CharSequence): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.Object, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object[]): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object, arg12: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                log(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                printf(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Marker, arg2: string, arg3: Java.Object[]): void;
                printf(arg0: Java.org.apache.logging.log4j.Level, arg1: string, arg2: Java.Object[]): void;
                throwing<T>(arg0: Java.org.apache.logging.log4j.Level, arg1: T): T;
                throwing<T>(arg0: T): T;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.message.Message): void;
                trace(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                trace(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                trace(arg0: Java.CharSequence): void;
                trace(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                trace(arg0: Java.Object): void;
                trace(arg0: Java.Object, arg1: Java.Throwable): void;
                trace(arg0: string): void;
                trace(arg0: string, arg1: Java.Object[]): void;
                trace(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                trace(arg0: string, arg1: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                trace(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                trace(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                trace(arg0: string, arg1: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                trace(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                traceEntry(): Java.org.apache.logging.log4j.message.EntryMessage;
                traceEntry(arg0: string, arg1: Java.Object[]): Java.org.apache.logging.log4j.message.EntryMessage;
                traceEntry(arg0: Java.org.apache.logging.log4j.util.Supplier<any>[]): Java.org.apache.logging.log4j.message.EntryMessage;
                traceEntry(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): Java.org.apache.logging.log4j.message.EntryMessage;
                traceEntry(arg0: Java.org.apache.logging.log4j.message.Message): Java.org.apache.logging.log4j.message.EntryMessage;
                traceExit(): void;
                traceExit<R>(arg0: R): R;
                traceExit<R>(arg0: string, arg1: R): R;
                traceExit(arg0: Java.org.apache.logging.log4j.message.EntryMessage): void;
                traceExit<R>(arg0: Java.org.apache.logging.log4j.message.EntryMessage, arg1: R): R;
                traceExit<R>(arg0: Java.org.apache.logging.log4j.message.Message, arg1: R): R;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.message.Message, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.MessageSupplier, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.CharSequence, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.Object, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object[]): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: Java.org.apache.logging.log4j.util.Supplier<any>, arg2: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.message.Message): void;
                warn(arg0: Java.org.apache.logging.log4j.message.Message, arg1: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.util.MessageSupplier): void;
                warn(arg0: Java.org.apache.logging.log4j.util.MessageSupplier, arg1: Java.Throwable): void;
                warn(arg0: Java.CharSequence): void;
                warn(arg0: Java.CharSequence, arg1: Java.Throwable): void;
                warn(arg0: Java.Object): void;
                warn(arg0: Java.Object, arg1: Java.Throwable): void;
                warn(arg0: string): void;
                warn(arg0: string, arg1: Java.Object[]): void;
                warn(arg0: string, arg1: Java.org.apache.logging.log4j.util.Supplier<any>[]): void;
                warn(arg0: string, arg1: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.util.Supplier<any>): void;
                warn(arg0: Java.org.apache.logging.log4j.util.Supplier<any>, arg1: Java.Throwable): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                warn(arg0: Java.org.apache.logging.log4j.Marker, arg1: string, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object, arg11: Java.Object): void;
                warn(arg0: string, arg1: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object): void;
                warn(arg0: string, arg1: Java.Object, arg2: Java.Object, arg3: Java.Object, arg4: Java.Object, arg5: Java.Object, arg6: Java.Object, arg7: Java.Object, arg8: Java.Object, arg9: Java.Object, arg10: Java.Object): void;
                
            }
            export interface Marker extends Java.Interface, Java.java.io.Serializable {
                
            
                addParents(arg0: Java.org.apache.logging.log4j.Marker[]): Java.org.apache.logging.log4j.Marker;
                equals(arg0: Java.Object): boolean;
                getName(): string;
                getParents(): Java.org.apache.logging.log4j.Marker[];
                hashCode(): number;
                hasParents(): boolean;
                isInstanceOf(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                isInstanceOf(arg0: string): boolean;
                remove(arg0: Java.org.apache.logging.log4j.Marker): boolean;
                setParents(arg0: Java.org.apache.logging.log4j.Marker[]): Java.org.apache.logging.log4j.Marker;
                
            }
            export interface Level extends Java.Object, Java.Comparable<Java.org.apache.logging.log4j.Level>, Java.java.io.Serializable {
                // static
                readonly OFF: Java.org.apache.logging.log4j.Level;
                // static
                readonly FATAL: Java.org.apache.logging.log4j.Level;
                // static
                readonly ERROR: Java.org.apache.logging.log4j.Level;
                // static
                readonly WARN: Java.org.apache.logging.log4j.Level;
                // static
                readonly INFO: Java.org.apache.logging.log4j.Level;
                // static
                readonly DEBUG: Java.org.apache.logging.log4j.Level;
                // static
                readonly TRACE: Java.org.apache.logging.log4j.Level;
                // static
                readonly ALL: Java.org.apache.logging.log4j.Level;
                // static
                readonly CATEGORY: string;
                
            
                intLevel(): number;
                getStandardLevel(): Java.org.apache.logging.log4j.spi.StandardLevel;
                isInRange(arg0: Java.org.apache.logging.log4j.Level, arg1: Java.org.apache.logging.log4j.Level): boolean;
                isLessSpecificThan(arg0: Java.org.apache.logging.log4j.Level): boolean;
                isMoreSpecificThan(arg0: Java.org.apache.logging.log4j.Level): boolean;
                clone(): Java.org.apache.logging.log4j.Level;
                compareTo(arg0: Java.org.apache.logging.log4j.Level): number;
                equals(arg0: Java.Object): boolean;
                getDeclaringClass(): Java.Class<Java.org.apache.logging.log4j.Level>;
                hashCode(): number;
                name(): string;
                toString(): string;
                // static
                forName(arg0: string, arg1: number): Java.org.apache.logging.log4j.Level;
                // static
                getLevel(arg0: string): Java.org.apache.logging.log4j.Level;
                // static
                toLevel(arg0: string): Java.org.apache.logging.log4j.Level;
                // static
                toLevel(arg0: string, arg1: Java.org.apache.logging.log4j.Level): Java.org.apache.logging.log4j.Level;
                // static
                values(): Java.org.apache.logging.log4j.Level[];
                // static
                valueOf(arg0: string): Java.org.apache.logging.log4j.Level;
                // static
                valueOf<T>(arg0: Java.Class<T>, arg1: string): T;
                
            }
        
            export namespace message {
            
                export interface Message extends Java.Interface, Java.java.io.Serializable {
                    
                
                    getFormattedMessage(): string;
                    getFormat(): string;
                    getParameters(): Java.Object[];
                    getThrowable(): Java.Throwable;
                    
                }
                export interface EntryMessage extends Java.Interface, Java.org.apache.logging.log4j.message.FlowMessage {
                    
                
                    
                }
                export interface FlowMessage extends Java.Interface, Java.org.apache.logging.log4j.message.Message {
                    
                
                    getText(): string;
                    getMessage(): Java.org.apache.logging.log4j.message.Message;
                    
                }
            }
        
            export namespace util {
            
                export interface Supplier<T> extends Java.Interface {
                    
                
                    get(): T;
                    
                }
                export interface MessageSupplier extends Java.Interface {
                    
                
                    get(): Java.org.apache.logging.log4j.message.Message;
                    
                }
            }
        
            export namespace spi {
            
                export interface StandardLevel extends Java.Enum<Java.org.apache.logging.log4j.spi.StandardLevel> {
                    // static
                    readonly OFF: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly FATAL: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly ERROR: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly WARN: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly INFO: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly DEBUG: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly TRACE: Java.org.apache.logging.log4j.spi.StandardLevel;
                    // static
                    readonly ALL: Java.org.apache.logging.log4j.spi.StandardLevel;
                    
                
                    // static
                    values(): Java.org.apache.logging.log4j.spi.StandardLevel[];
                    // static
                    valueOf(arg0: string): Java.org.apache.logging.log4j.spi.StandardLevel;
                    intLevel(): number;
                    // static
                    getStandardLevel(arg0: number): Java.org.apache.logging.log4j.spi.StandardLevel;
                    
                }
            }
        }
    }

    export namespace javax {
    
    
        export namespace sound.sampled {
        
            export interface Clip extends Java.Interface, Java.javax.sound.sampled.DataLine {
                // static
                readonly LOOP_CONTINUOUSLY: number;
                
            
                open(arg0: Java.javax.sound.sampled.AudioFormat, arg1: number[], arg2: number, arg3: number): void;
                open(arg0: Java.javax.sound.sampled.AudioInputStream): void;
                getFrameLength(): number;
                getMicrosecondLength(): number;
                setFramePosition(arg0: number): void;
                setMicrosecondPosition(arg0: number): void;
                setLoopPoints(arg0: number, arg1: number): void;
                loop(arg0: number): void;
                
            }
            export interface AudioFormat extends Java.Object {
                
            
                getEncoding(): Java.javax.sound.sampled.AudioFormat$Encoding;
                getSampleRate(): number;
                getSampleSizeInBits(): number;
                getChannels(): number;
                getFrameSize(): number;
                getFrameRate(): number;
                isBigEndian(): boolean;
                properties(): Java.java.util.Map<string, Java.Object>;
                getProperty(arg0: string): Java.Object;
                matches(arg0: Java.javax.sound.sampled.AudioFormat): boolean;
                toString(): string;
                
            }
            export interface DataLine extends Java.Interface, Java.javax.sound.sampled.Line {
                
            
                drain(): void;
                flush(): void;
                start(): void;
                stop(): void;
                isRunning(): boolean;
                isActive(): boolean;
                getFormat(): Java.javax.sound.sampled.AudioFormat;
                getBufferSize(): number;
                available(): number;
                getFramePosition(): number;
                getLongFramePosition(): number;
                getMicrosecondPosition(): number;
                getLevel(): number;
                
            }
            export interface AudioInputStream extends Java.java.io.InputStream {
                
            
                getFormat(): Java.javax.sound.sampled.AudioFormat;
                getFrameLength(): number;
                read(): number;
                read(arg0: number[]): number;
                read(arg0: number[], arg1: number, arg2: number): number;
                skip(arg0: number): number;
                available(): number;
                close(): void;
                mark(arg0: number): void;
                reset(): void;
                markSupported(): boolean;
                
            }
            export interface Line extends Java.Interface, Java.AutoCloseable {
                
            
                getLineInfo(): Java.javax.sound.sampled.Line$Info;
                open(): void;
                close(): void;
                isOpen(): boolean;
                getControls(): Java.javax.sound.sampled.Control[];
                isControlSupported(arg0: Java.javax.sound.sampled.Control$Type): boolean;
                getControl(arg0: Java.javax.sound.sampled.Control$Type): Java.javax.sound.sampled.Control;
                addLineListener(arg0: Java.javax.sound.sampled.LineListener): void;
                removeLineListener(arg0: Java.javax.sound.sampled.LineListener): void;
                
            }
            export interface AudioFormat$Encoding extends Java.Object {
                // static
                readonly PCM_SIGNED: Java.javax.sound.sampled.AudioFormat$Encoding;
                // static
                readonly PCM_UNSIGNED: Java.javax.sound.sampled.AudioFormat$Encoding;
                // static
                readonly PCM_FLOAT: Java.javax.sound.sampled.AudioFormat$Encoding;
                // static
                readonly ULAW: Java.javax.sound.sampled.AudioFormat$Encoding;
                // static
                readonly ALAW: Java.javax.sound.sampled.AudioFormat$Encoding;
                
            
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Control$Type extends Java.Object {
                
            
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Line$Info extends Java.Object {
                
            
                getLineClass(): Java.Class<any>;
                matches(arg0: Java.javax.sound.sampled.Line$Info): boolean;
                toString(): string;
                
            }
            export interface LineListener extends Java.Interface, Java.java.util.EventListener {
                
            
                update(arg0: Java.javax.sound.sampled.LineEvent): void;
                
            }
            export interface Control extends Java.Object {
                
            
                getType(): Java.javax.sound.sampled.Control$Type;
                toString(): string;
                
            }
            export interface LineEvent extends Java.java.util.EventObject {
                
            
                getLine(): Java.javax.sound.sampled.Line;
                getType(): Java.javax.sound.sampled.LineEvent$Type;
                getFramePosition(): number;
                toString(): string;
                
            }
            export interface LineEvent$Type extends Java.Object {
                // static
                readonly OPEN: Java.javax.sound.sampled.LineEvent$Type;
                // static
                readonly CLOSE: Java.javax.sound.sampled.LineEvent$Type;
                // static
                readonly START: Java.javax.sound.sampled.LineEvent$Type;
                // static
                readonly STOP: Java.javax.sound.sampled.LineEvent$Type;
                
            
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
        }
    
        export namespace security.auth {
        
            export interface Subject extends Java.Object, Java.java.io.Serializable {
                
            
                setReadOnly(): void;
                isReadOnly(): boolean;
                // static
                getSubject(arg0: Java.java.security.AccessControlContext): Java.javax.security.auth.Subject;
                // static
                doAs<T>(arg0: Java.javax.security.auth.Subject, arg1: Java.java.security.PrivilegedAction<T>): T;
                // static
                doAs<T>(arg0: Java.javax.security.auth.Subject, arg1: Java.java.security.PrivilegedExceptionAction<T>): T;
                // static
                doAsPrivileged<T>(arg0: Java.javax.security.auth.Subject, arg1: Java.java.security.PrivilegedAction<T>, arg2: Java.java.security.AccessControlContext): T;
                // static
                doAsPrivileged<T>(arg0: Java.javax.security.auth.Subject, arg1: Java.java.security.PrivilegedExceptionAction<T>, arg2: Java.java.security.AccessControlContext): T;
                getPrincipals(): Java.java.util.Set<Java.java.security.Principal>;
                getPrincipals<T>(arg0: Java.Class<T>): Java.java.util.Set<T>;
                getPublicCredentials(): Java.java.util.Set<Java.Object>;
                getPrivateCredentials(): Java.java.util.Set<Java.Object>;
                getPublicCredentials<T>(arg0: Java.Class<T>): Java.java.util.Set<T>;
                getPrivateCredentials<T>(arg0: Java.Class<T>): Java.java.util.Set<T>;
                equals(arg0: Java.Object): boolean;
                toString(): string;
                hashCode(): number;
                
            }
        }
    }

    export namespace java {
    
    
        export namespace util {
        
            export interface Map$Entry<K, V> extends Java.Interface {
                
            
                getKey(): K;
                getValue(): V;
                setValue(arg0: V): V;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                // static
                comparingByKey<K, V>(): Java.java.util.Comparator<Java.java.util.Map$Entry<K, V>>;
                // static
                comparingByValue<K, V>(): Java.java.util.Comparator<Java.java.util.Map$Entry<K, V>>;
                // static
                comparingByKey<K, V>(arg0: Java.java.util.Comparator<any>): Java.java.util.Comparator<Java.java.util.Map$Entry<K, V>>;
                // static
                comparingByValue<K, V>(arg0: Java.java.util.Comparator<any>): Java.java.util.Comparator<Java.java.util.Map$Entry<K, V>>;
                
            }
            export interface Comparator<T> extends Java.Interface {
                
            
                compare(arg0: T, arg1: T): number;
                equals(arg0: Java.Object): boolean;
                reversed(): Java.java.util.Comparator<T>;
                thenComparing(arg0: Java.java.util.Comparator<any>): Java.java.util.Comparator<T>;
                thenComparing<U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.Comparator<any>): Java.java.util.Comparator<T>;
                thenComparing<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.Comparator<T>;
                thenComparingInt(arg0: Java.java.util._function.ToIntFunction<any>): Java.java.util.Comparator<T>;
                thenComparingLong(arg0: Java.java.util._function.ToLongFunction<any>): Java.java.util.Comparator<T>;
                thenComparingDouble(arg0: Java.java.util._function.ToDoubleFunction<any>): Java.java.util.Comparator<T>;
                // static
                reverseOrder<T>(): Java.java.util.Comparator<T>;
                // static
                naturalOrder<T>(): Java.java.util.Comparator<T>;
                // static
                nullsFirst<T>(arg0: Java.java.util.Comparator<any>): Java.java.util.Comparator<T>;
                // static
                nullsLast<T>(arg0: Java.java.util.Comparator<any>): Java.java.util.Comparator<T>;
                // static
                comparing<T, U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.Comparator<any>): Java.java.util.Comparator<T>;
                // static
                comparing<T, U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.Comparator<T>;
                // static
                comparingInt<T>(arg0: Java.java.util._function.ToIntFunction<any>): Java.java.util.Comparator<T>;
                // static
                comparingLong<T>(arg0: Java.java.util._function.ToLongFunction<any>): Java.java.util.Comparator<T>;
                // static
                comparingDouble<T>(arg0: Java.java.util._function.ToDoubleFunction<any>): Java.java.util.Comparator<T>;
                
            }
            export interface Spliterator<T> extends Java.Interface {
                // static
                readonly ORDERED: number;
                // static
                readonly DISTINCT: number;
                // static
                readonly SORTED: number;
                // static
                readonly SIZED: number;
                // static
                readonly NONNULL: number;
                // static
                readonly IMMUTABLE: number;
                // static
                readonly CONCURRENT: number;
                // static
                readonly SUBSIZED: number;
                
            
                tryAdvance(arg0: Java.java.util._function.Consumer<any>): boolean;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                trySplit(): Java.java.util.Spliterator<T>;
                estimateSize(): number;
                getExactSizeIfKnown(): number;
                characteristics(): number;
                hasCharacteristics(arg0: number): boolean;
                getComparator(): Java.java.util.Comparator<any>;
                
            }
            export interface Random extends Java.Object, Java.java.io.Serializable {
                
            
                setSeed(arg0: number): void;
                nextBytes(arg0: number[]): void;
                nextInt(): number;
                nextInt(arg0: number): number;
                nextLong(): number;
                nextBoolean(): boolean;
                nextFloat(): number;
                nextDouble(): number;
                nextGaussian(): number;
                ints(arg0: number): Java.java.util.stream.IntStream;
                ints(): Java.java.util.stream.IntStream;
                ints(arg0: number, arg1: number, arg2: number): Java.java.util.stream.IntStream;
                ints(arg0: number, arg1: number): Java.java.util.stream.IntStream;
                longs(arg0: number): Java.java.util.stream.LongStream;
                longs(): Java.java.util.stream.LongStream;
                longs(arg0: number, arg1: number, arg2: number): Java.java.util.stream.LongStream;
                longs(arg0: number, arg1: number): Java.java.util.stream.LongStream;
                doubles(arg0: number): Java.java.util.stream.DoubleStream;
                doubles(): Java.java.util.stream.DoubleStream;
                doubles(arg0: number, arg1: number, arg2: number): Java.java.util.stream.DoubleStream;
                doubles(arg0: number, arg1: number): Java.java.util.stream.DoubleStream;
                
            }
            export interface Optional<T> extends Java.Object {
                
            
                // static
                empty<T>(): Java.java.util.Optional<T>;
                // static
                of<T>(arg0: T): Java.java.util.Optional<T>;
                // static
                ofNullable<T>(arg0: T): Java.java.util.Optional<T>;
                get(): T;
                isPresent(): boolean;
                isEmpty(): boolean;
                ifPresent(arg0: Java.java.util._function.Consumer<any>): void;
                ifPresentOrElse(arg0: Java.java.util._function.Consumer<any>, arg1: Java.Runnable): void;
                filter(arg0: Java.java.util._function.Predicate<any>): Java.java.util.Optional<T>;
                map<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.Optional<U>;
                flatMap<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.Optional<U>;
                or(arg0: Java.java.util._function.Supplier<any>): Java.java.util.Optional<T>;
                stream(): Java.java.util.stream.Stream<T>;
                orElse(arg0: T): T;
                orElseGet(arg0: Java.java.util._function.Supplier<any>): T;
                orElseThrow(): T;
                orElseThrow<X>(arg0: Java.java.util._function.Supplier<any>): T;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Enumeration<E> extends Java.Interface {
                
            
                hasMoreElements(): boolean;
                nextElement(): E;
                asIterator(): Java.java.util.Iterator<E>;
                
            }
            export interface EventObject extends Java.Object, Java.java.io.Serializable {
                
            
                getSource(): Java.Object;
                toString(): string;
                
            }
            export interface Locale extends Java.Object, Java.Cloneable, Java.java.io.Serializable {
                // static
                readonly ENGLISH: Java.java.util.Locale;
                // static
                readonly FRENCH: Java.java.util.Locale;
                // static
                readonly GERMAN: Java.java.util.Locale;
                // static
                readonly ITALIAN: Java.java.util.Locale;
                // static
                readonly JAPANESE: Java.java.util.Locale;
                // static
                readonly KOREAN: Java.java.util.Locale;
                // static
                readonly CHINESE: Java.java.util.Locale;
                // static
                readonly SIMPLIFIED_CHINESE: Java.java.util.Locale;
                // static
                readonly TRADITIONAL_CHINESE: Java.java.util.Locale;
                // static
                readonly FRANCE: Java.java.util.Locale;
                // static
                readonly GERMANY: Java.java.util.Locale;
                // static
                readonly ITALY: Java.java.util.Locale;
                // static
                readonly JAPAN: Java.java.util.Locale;
                // static
                readonly KOREA: Java.java.util.Locale;
                // static
                readonly UK: Java.java.util.Locale;
                // static
                readonly US: Java.java.util.Locale;
                // static
                readonly CANADA: Java.java.util.Locale;
                // static
                readonly CANADA_FRENCH: Java.java.util.Locale;
                // static
                readonly ROOT: Java.java.util.Locale;
                // static
                readonly CHINA: Java.java.util.Locale;
                // static
                readonly PRC: Java.java.util.Locale;
                // static
                readonly TAIWAN: Java.java.util.Locale;
                // static
                readonly PRIVATE_USE_EXTENSION: number;
                // static
                readonly UNICODE_LOCALE_EXTENSION: number;
                
            
                // static
                getDefault(): Java.java.util.Locale;
                // static
                getDefault(arg0: Java.java.util.Locale$Category): Java.java.util.Locale;
                // static
                setDefault(arg0: Java.java.util.Locale): void;
                // static
                setDefault(arg0: Java.java.util.Locale$Category, arg1: Java.java.util.Locale): void;
                // static
                getAvailableLocales(): Java.java.util.Locale[];
                // static
                getISOCountries(): string[];
                // static
                getISOCountries(arg0: Java.java.util.Locale$IsoCountryCode): Java.java.util.Set<string>;
                // static
                getISOLanguages(): string[];
                getLanguage(): string;
                getScript(): string;
                getCountry(): string;
                getVariant(): string;
                hasExtensions(): boolean;
                stripExtensions(): Java.java.util.Locale;
                getExtension(arg0: number): string;
                getExtensionKeys(): Java.java.util.Set<number>;
                getUnicodeLocaleAttributes(): Java.java.util.Set<string>;
                getUnicodeLocaleType(arg0: string): string;
                getUnicodeLocaleKeys(): Java.java.util.Set<string>;
                toString(): string;
                toLanguageTag(): string;
                // static
                forLanguageTag(arg0: string): Java.java.util.Locale;
                getISO3Language(): string;
                getISO3Country(): string;
                getDisplayLanguage(): string;
                getDisplayLanguage(arg0: Java.java.util.Locale): string;
                getDisplayScript(): string;
                getDisplayScript(arg0: Java.java.util.Locale): string;
                getDisplayCountry(): string;
                getDisplayCountry(arg0: Java.java.util.Locale): string;
                getDisplayVariant(): string;
                getDisplayVariant(arg0: Java.java.util.Locale): string;
                getDisplayName(): string;
                getDisplayName(arg0: Java.java.util.Locale): string;
                clone(): Java.Object;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                // static
                filter(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<Java.java.util.Locale>, arg2: Java.java.util.Locale$FilteringMode): Java.java.util.List<Java.java.util.Locale>;
                // static
                filter(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<Java.java.util.Locale>): Java.java.util.List<Java.java.util.Locale>;
                // static
                filterTags(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<string>, arg2: Java.java.util.Locale$FilteringMode): Java.java.util.List<string>;
                // static
                filterTags(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<string>): Java.java.util.List<string>;
                // static
                lookup(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<Java.java.util.Locale>): Java.java.util.Locale;
                // static
                lookupTag(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Collection<string>): string;
                
            }
            export interface EventListener extends Java.Interface {
                
            
                
            }
            export interface SortedMap<K, V> extends Java.Interface, Java.java.util.Map<K, V> {
                
            
                comparator(): Java.java.util.Comparator<any>;
                subMap(arg0: K, arg1: K): Java.java.util.SortedMap<K, V>;
                headMap(arg0: K): Java.java.util.SortedMap<K, V>;
                tailMap(arg0: K): Java.java.util.SortedMap<K, V>;
                firstKey(): K;
                lastKey(): K;
                keySet(): Java.java.util.Set<K>;
                values(): Java.java.util.Collection<V>;
                entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<K, V>>;
                
            }
            export interface Iterator<E> extends Java.Interface {
                
            
                hasNext(): boolean;
                next(): E;
                remove(): void;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface DoubleSummaryStatistics extends Java.Object, Java.java.util._function.DoubleConsumer {
                
            
                accept(arg0: number): void;
                combine(arg0: Java.java.util.DoubleSummaryStatistics): void;
                getCount(): number;
                getSum(): number;
                getMin(): number;
                getMax(): number;
                getAverage(): number;
                toString(): string;
                
            }
            export interface PrimitiveIterator$OfLong extends Java.Interface, Java.java.util.PrimitiveIterator<number, Java.java.util._function.LongConsumer> {
                
            
                nextLong(): number;
                forEachRemaining(arg0: Java.java.util._function.LongConsumer): void;
                next(): number;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface LongSummaryStatistics extends Java.Object, Java.java.util._function.LongConsumer, Java.java.util._function.IntConsumer {
                
            
                accept(arg0: number): void;
                accept(arg0: number): void;
                combine(arg0: Java.java.util.LongSummaryStatistics): void;
                getCount(): number;
                getSum(): number;
                getMin(): number;
                getMax(): number;
                getAverage(): number;
                toString(): string;
                
            }
            export interface Locale$IsoCountryCode extends Java.Enum<Java.java.util.Locale$IsoCountryCode> {
                // static
                readonly PART1_ALPHA2: Java.java.util.Locale$IsoCountryCode;
                // static
                readonly PART1_ALPHA3: Java.java.util.Locale$IsoCountryCode;
                // static
                readonly PART3: Java.java.util.Locale$IsoCountryCode;
                
            
                // static
                values(): Java.java.util.Locale$IsoCountryCode[];
                // static
                valueOf(arg0: string): Java.java.util.Locale$IsoCountryCode;
                
            }
            export interface IntSummaryStatistics extends Java.Object, Java.java.util._function.IntConsumer {
                
            
                accept(arg0: number): void;
                combine(arg0: Java.java.util.IntSummaryStatistics): void;
                getCount(): number;
                getSum(): number;
                getMin(): number;
                getMax(): number;
                getAverage(): number;
                toString(): string;
                
            }
            export interface Spliterator$OfDouble extends Java.Interface, Java.java.util.Spliterator$OfPrimitive<number, Java.java.util._function.DoubleConsumer, Java.java.util.Spliterator$OfDouble> {
                
            
                trySplit(): Java.java.util.Spliterator$OfDouble;
                tryAdvance(arg0: Java.java.util._function.DoubleConsumer): boolean;
                forEachRemaining(arg0: Java.java.util._function.DoubleConsumer): void;
                tryAdvance(arg0: Java.java.util._function.Consumer<any>): boolean;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface Locale$FilteringMode extends Java.Enum<Java.java.util.Locale$FilteringMode> {
                // static
                readonly AUTOSELECT_FILTERING: Java.java.util.Locale$FilteringMode;
                // static
                readonly EXTENDED_FILTERING: Java.java.util.Locale$FilteringMode;
                // static
                readonly IGNORE_EXTENDED_RANGES: Java.java.util.Locale$FilteringMode;
                // static
                readonly MAP_EXTENDED_RANGES: Java.java.util.Locale$FilteringMode;
                // static
                readonly REJECT_EXTENDED_RANGES: Java.java.util.Locale$FilteringMode;
                
            
                // static
                values(): Java.java.util.Locale$FilteringMode[];
                // static
                valueOf(arg0: string): Java.java.util.Locale$FilteringMode;
                
            }
            export interface PrimitiveIterator$OfInt extends Java.Interface, Java.java.util.PrimitiveIterator<number, Java.java.util._function.IntConsumer> {
                
            
                nextInt(): number;
                forEachRemaining(arg0: Java.java.util._function.IntConsumer): void;
                next(): number;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface OptionalLong extends Java.Object {
                
            
                // static
                empty(): Java.java.util.OptionalLong;
                // static
                of(arg0: number): Java.java.util.OptionalLong;
                getAsLong(): number;
                isPresent(): boolean;
                isEmpty(): boolean;
                ifPresent(arg0: Java.java.util._function.LongConsumer): void;
                ifPresentOrElse(arg0: Java.java.util._function.LongConsumer, arg1: Java.Runnable): void;
                stream(): Java.java.util.stream.LongStream;
                orElse(arg0: number): number;
                orElseGet(arg0: Java.java.util._function.LongSupplier): number;
                orElseThrow(): number;
                orElseThrow<X>(arg0: Java.java.util._function.Supplier<any>): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface OptionalDouble extends Java.Object {
                
            
                // static
                empty(): Java.java.util.OptionalDouble;
                // static
                of(arg0: number): Java.java.util.OptionalDouble;
                getAsDouble(): number;
                isPresent(): boolean;
                isEmpty(): boolean;
                ifPresent(arg0: Java.java.util._function.DoubleConsumer): void;
                ifPresentOrElse(arg0: Java.java.util._function.DoubleConsumer, arg1: Java.Runnable): void;
                stream(): Java.java.util.stream.DoubleStream;
                orElse(arg0: number): number;
                orElseGet(arg0: Java.java.util._function.DoubleSupplier): number;
                orElseThrow(): number;
                orElseThrow<X>(arg0: Java.java.util._function.Supplier<any>): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface OptionalInt extends Java.Object {
                
            
                // static
                empty(): Java.java.util.OptionalInt;
                // static
                of(arg0: number): Java.java.util.OptionalInt;
                getAsInt(): number;
                isPresent(): boolean;
                isEmpty(): boolean;
                ifPresent(arg0: Java.java.util._function.IntConsumer): void;
                ifPresentOrElse(arg0: Java.java.util._function.IntConsumer, arg1: Java.Runnable): void;
                stream(): Java.java.util.stream.IntStream;
                orElse(arg0: number): number;
                orElseGet(arg0: Java.java.util._function.IntSupplier): number;
                orElseThrow(): number;
                orElseThrow<X>(arg0: Java.java.util._function.Supplier<any>): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Spliterator$OfLong extends Java.Interface, Java.java.util.Spliterator$OfPrimitive<number, Java.java.util._function.LongConsumer, Java.java.util.Spliterator$OfLong> {
                
            
                trySplit(): Java.java.util.Spliterator$OfLong;
                tryAdvance(arg0: Java.java.util._function.LongConsumer): boolean;
                forEachRemaining(arg0: Java.java.util._function.LongConsumer): void;
                tryAdvance(arg0: Java.java.util._function.Consumer<any>): boolean;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface Spliterator$OfInt extends Java.Interface, Java.java.util.Spliterator$OfPrimitive<number, Java.java.util._function.IntConsumer, Java.java.util.Spliterator$OfInt> {
                
            
                trySplit(): Java.java.util.Spliterator$OfInt;
                tryAdvance(arg0: Java.java.util._function.IntConsumer): boolean;
                forEachRemaining(arg0: Java.java.util._function.IntConsumer): void;
                tryAdvance(arg0: Java.java.util._function.Consumer<any>): boolean;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface ResourceBundle extends Java.Object {
                
            
                getBaseBundleName(): string;
                getString(arg0: string): string;
                getStringArray(arg0: string): string[];
                getObject(arg0: string): Java.Object;
                getLocale(): Java.java.util.Locale;
                // static
                getBundle(arg0: string): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.ResourceBundle$Control): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.Locale): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.Module): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.Locale, arg2: Java.Module): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.Locale, arg2: Java.java.util.ResourceBundle$Control): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.Locale, arg2: Java.ClassLoader): Java.java.util.ResourceBundle;
                // static
                getBundle(arg0: string, arg1: Java.java.util.Locale, arg2: Java.ClassLoader, arg3: Java.java.util.ResourceBundle$Control): Java.java.util.ResourceBundle;
                // static
                clearCache(): void;
                // static
                clearCache(arg0: Java.ClassLoader): void;
                getKeys(): Java.java.util.Enumeration<string>;
                containsKey(arg0: string): boolean;
                keySet(): Java.java.util.Set<string>;
                
            }
            export interface Locale$Category extends Java.Enum<Java.java.util.Locale$Category> {
                // static
                readonly DISPLAY: Java.java.util.Locale$Category;
                // static
                readonly FORMAT: Java.java.util.Locale$Category;
                
            
                // static
                values(): Java.java.util.Locale$Category[];
                // static
                valueOf(arg0: string): Java.java.util.Locale$Category;
                
            }
            export interface PrimitiveIterator$OfDouble extends Java.Interface, Java.java.util.PrimitiveIterator<number, Java.java.util._function.DoubleConsumer> {
                
            
                nextDouble(): number;
                forEachRemaining(arg0: Java.java.util._function.DoubleConsumer): void;
                next(): number;
                forEachRemaining(arg0: Java.java.util._function.Consumer<any>): void;
                
            }
            export interface Locale$LanguageRange extends Java.Object {
                // static
                readonly MAX_WEIGHT: number;
                // static
                readonly MIN_WEIGHT: number;
                
            
                getRange(): string;
                getWeight(): number;
                // static
                parse(arg0: string): Java.java.util.List<Java.java.util.Locale$LanguageRange>;
                // static
                parse(arg0: string, arg1: Java.java.util.Map<string, Java.java.util.List<string>>): Java.java.util.List<Java.java.util.Locale$LanguageRange>;
                // static
                mapEquivalents(arg0: Java.java.util.List<Java.java.util.Locale$LanguageRange>, arg1: Java.java.util.Map<string, Java.java.util.List<string>>): Java.java.util.List<Java.java.util.Locale$LanguageRange>;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                toString(): string;
                
            }
            export interface PrimitiveIterator<T, T_CONS> extends Java.Interface, Java.java.util.Iterator<T> {
                
            
                forEachRemaining(arg0: T_CONS): void;
                
            }
            export interface Spliterator$OfPrimitive<T, T_CONS, T_SPLITR> extends Java.Interface, Java.java.util.Spliterator<T> {
                
            
                trySplit(): T_SPLITR;
                tryAdvance(arg0: T_CONS): boolean;
                forEachRemaining(arg0: T_CONS): void;
                
            }
            export interface ResourceBundle$Control extends Java.Object {
                // static
                readonly FORMAT_DEFAULT: Java.java.util.List<string>;
                // static
                readonly FORMAT_CLASS: Java.java.util.List<string>;
                // static
                readonly FORMAT_PROPERTIES: Java.java.util.List<string>;
                // static
                readonly TTL_DONT_CACHE: number;
                // static
                readonly TTL_NO_EXPIRATION_CONTROL: number;
                
            
                // static
                getControl(arg0: Java.java.util.List<string>): Java.java.util.ResourceBundle$Control;
                // static
                getNoFallbackControl(arg0: Java.java.util.List<string>): Java.java.util.ResourceBundle$Control;
                getFormats(arg0: string): Java.java.util.List<string>;
                getCandidateLocales(arg0: string, arg1: Java.java.util.Locale): Java.java.util.List<Java.java.util.Locale>;
                getFallbackLocale(arg0: string, arg1: Java.java.util.Locale): Java.java.util.Locale;
                newBundle(arg0: string, arg1: Java.java.util.Locale, arg2: string, arg3: Java.ClassLoader, arg4: boolean): Java.java.util.ResourceBundle;
                getTimeToLive(arg0: string, arg1: Java.java.util.Locale): number;
                needsReload(arg0: string, arg1: Java.java.util.Locale, arg2: string, arg3: Java.ClassLoader, arg4: Java.java.util.ResourceBundle, arg5: number): boolean;
                toBundleName(arg0: string, arg1: Java.java.util.Locale): string;
                toResourceName(arg0: string, arg1: string): string;
                
            }
            export interface Properties extends Java.java.util.Hashtable<Java.Object, Java.Object> {
                
            
                setProperty(arg0: string, arg1: string): Java.Object;
                load(arg0: Java.java.io.Reader): void;
                load(arg0: Java.java.io.InputStream): void;
                save(arg0: Java.java.io.OutputStream, arg1: string): void;
                store(arg0: Java.java.io.Writer, arg1: string): void;
                store(arg0: Java.java.io.OutputStream, arg1: string): void;
                loadFromXML(arg0: Java.java.io.InputStream): void;
                storeToXML(arg0: Java.java.io.OutputStream, arg1: string): void;
                storeToXML(arg0: Java.java.io.OutputStream, arg1: string, arg2: string): void;
                storeToXML(arg0: Java.java.io.OutputStream, arg1: string, arg2: Java.java.nio.charset.Charset): void;
                getProperty(arg0: string): string;
                getProperty(arg0: string, arg1: string): string;
                propertyNames(): Java.java.util.Enumeration<any>;
                stringPropertyNames(): Java.java.util.Set<string>;
                list(arg0: Java.java.io.PrintStream): void;
                list(arg0: Java.java.io.PrintWriter): void;
                size(): number;
                isEmpty(): boolean;
                keys(): Java.java.util.Enumeration<Java.Object>;
                elements(): Java.java.util.Enumeration<Java.Object>;
                contains(arg0: Java.Object): boolean;
                containsValue(arg0: Java.Object): boolean;
                containsKey(arg0: Java.Object): boolean;
                get(arg0: Java.Object): Java.Object;
                put(arg0: Java.Object, arg1: Java.Object): Java.Object;
                remove(arg0: Java.Object): Java.Object;
                putAll(arg0: Java.java.util.Map<any, any>): void;
                clear(): void;
                toString(): string;
                keySet(): Java.java.util.Set<Java.Object>;
                values(): Java.java.util.Collection<Java.Object>;
                entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<Java.Object, Java.Object>>;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                getOrDefault(arg0: Java.Object, arg1: Java.Object): Java.Object;
                forEach(arg0: Java.java.util._function.BiConsumer<any, any>): void;
                replaceAll(arg0: Java.java.util._function.BiFunction<any, any, any>): void;
                putIfAbsent(arg0: Java.Object, arg1: Java.Object): Java.Object;
                remove(arg0: Java.Object, arg1: Java.Object): boolean;
                replace(arg0: Java.Object, arg1: Java.Object, arg2: Java.Object): boolean;
                replace(arg0: Java.Object, arg1: Java.Object): Java.Object;
                computeIfAbsent(arg0: Java.Object, arg1: Java.java.util._function.Function<any, any>): Java.Object;
                computeIfPresent(arg0: Java.Object, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                compute(arg0: Java.Object, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                merge(arg0: Java.Object, arg1: Java.Object, arg2: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                clone(): Java.Object;
                
            }
            export interface Date extends Java.Object, Java.java.io.Serializable, Java.Cloneable, Java.Comparable<Java.java.util.Date> {
                
            
                clone(): Java.Object;
                // static
                UTC(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number): number;
                // static
                parse(arg0: string): number;
                getYear(): number;
                setYear(arg0: number): void;
                getMonth(): number;
                setMonth(arg0: number): void;
                getDate(): number;
                setDate(arg0: number): void;
                getDay(): number;
                getHours(): number;
                setHours(arg0: number): void;
                getMinutes(): number;
                setMinutes(arg0: number): void;
                getSeconds(): number;
                setSeconds(arg0: number): void;
                getTime(): number;
                setTime(arg0: number): void;
                before(arg0: Java.java.util.Date): boolean;
                after(arg0: Java.java.util.Date): boolean;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.util.Date): number;
                hashCode(): number;
                toString(): string;
                toLocaleString(): string;
                toGMTString(): string;
                getTimezoneOffset(): number;
                // static
                from(arg0: Java.java.time.Instant): Java.java.util.Date;
                toInstant(): Java.java.time.Instant;
                
            }
            export interface Hashtable<K, V> extends Java.java.util.Dictionary<K, V>, Java.java.util.Map<K, V>, Java.Cloneable, Java.java.io.Serializable {
                
            
                size(): number;
                isEmpty(): boolean;
                keys(): Java.java.util.Enumeration<K>;
                elements(): Java.java.util.Enumeration<V>;
                contains(arg0: Java.Object): boolean;
                containsValue(arg0: Java.Object): boolean;
                containsKey(arg0: Java.Object): boolean;
                get(arg0: Java.Object): V;
                put(arg0: K, arg1: V): V;
                remove(arg0: Java.Object): V;
                putAll(arg0: Java.java.util.Map<any, any>): void;
                clear(): void;
                clone(): Java.Object;
                toString(): string;
                keySet(): Java.java.util.Set<K>;
                entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<K, V>>;
                values(): Java.java.util.Collection<V>;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                getOrDefault(arg0: Java.Object, arg1: V): V;
                forEach(arg0: Java.java.util._function.BiConsumer<any, any>): void;
                replaceAll(arg0: Java.java.util._function.BiFunction<any, any, any>): void;
                putIfAbsent(arg0: K, arg1: V): V;
                remove(arg0: Java.Object, arg1: Java.Object): boolean;
                replace(arg0: K, arg1: V, arg2: V): boolean;
                replace(arg0: K, arg1: V): V;
                computeIfAbsent(arg0: K, arg1: Java.java.util._function.Function<any, any>): V;
                computeIfPresent(arg0: K, arg1: Java.java.util._function.BiFunction<any, any, any>): V;
                compute(arg0: K, arg1: Java.java.util._function.BiFunction<any, any, any>): V;
                merge(arg0: K, arg1: V, arg2: Java.java.util._function.BiFunction<any, any, any>): V;
                
            }
            export interface Dictionary<K, V> extends Java.Object {
                
            
                size(): number;
                isEmpty(): boolean;
                keys(): Java.java.util.Enumeration<K>;
                elements(): Java.java.util.Enumeration<V>;
                get(arg0: Java.Object): V;
                put(arg0: K, arg1: V): V;
                remove(arg0: Java.Object): V;
                
            }
        
            export namespace _function {
            
                export interface LongUnaryOperator extends Java.Interface {
                    
                
                    applyAsLong(arg0: number): number;
                    compose(arg0: Java.java.util._function.LongUnaryOperator): Java.java.util._function.LongUnaryOperator;
                    andThen(arg0: Java.java.util._function.LongUnaryOperator): Java.java.util._function.LongUnaryOperator;
                    // static
                    identity(): Java.java.util._function.LongUnaryOperator;
                    
                }
                export interface BiFunction<T, U, R> extends Java.Interface {
                    
                
                    apply(arg0: T, arg1: U): R;
                    andThen<V>(arg0: Java.java.util._function.Function<any, any>): Java.java.util._function.BiFunction<T, U, V>;
                    
                }
                export interface LongPredicate extends Java.Interface {
                    
                
                    test(arg0: number): boolean;
                    and(arg0: Java.java.util._function.LongPredicate): Java.java.util._function.LongPredicate;
                    negate(): Java.java.util._function.LongPredicate;
                    or(arg0: Java.java.util._function.LongPredicate): Java.java.util._function.LongPredicate;
                    
                }
                export interface BiConsumer<T, U> extends Java.Interface {
                    
                
                    accept(arg0: T, arg1: U): void;
                    andThen(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util._function.BiConsumer<T, U>;
                    
                }
                export interface DoubleFunction<R> extends Java.Interface {
                    
                
                    apply(arg0: number): R;
                    
                }
                export interface DoubleToLongFunction extends Java.Interface {
                    
                
                    applyAsLong(arg0: number): number;
                    
                }
                export interface LongFunction<R> extends Java.Interface {
                    
                
                    apply(arg0: number): R;
                    
                }
                export interface DoublePredicate extends Java.Interface {
                    
                
                    test(arg0: number): boolean;
                    and(arg0: Java.java.util._function.DoublePredicate): Java.java.util._function.DoublePredicate;
                    negate(): Java.java.util._function.DoublePredicate;
                    or(arg0: Java.java.util._function.DoublePredicate): Java.java.util._function.DoublePredicate;
                    
                }
                export interface DoubleBinaryOperator extends Java.Interface {
                    
                
                    applyAsDouble(arg0: number, arg1: number): number;
                    
                }
                export interface ToLongFunction<T> extends Java.Interface {
                    
                
                    applyAsLong(arg0: T): number;
                    
                }
                export interface IntUnaryOperator extends Java.Interface {
                    
                
                    applyAsInt(arg0: number): number;
                    compose(arg0: Java.java.util._function.IntUnaryOperator): Java.java.util._function.IntUnaryOperator;
                    andThen(arg0: Java.java.util._function.IntUnaryOperator): Java.java.util._function.IntUnaryOperator;
                    // static
                    identity(): Java.java.util._function.IntUnaryOperator;
                    
                }
                export interface IntBinaryOperator extends Java.Interface {
                    
                
                    applyAsInt(arg0: number, arg1: number): number;
                    
                }
                export interface ToIntFunction<T> extends Java.Interface {
                    
                
                    applyAsInt(arg0: T): number;
                    
                }
                export interface ObjDoubleConsumer<T> extends Java.Interface {
                    
                
                    accept(arg0: T, arg1: number): void;
                    
                }
                export interface LongSupplier extends Java.Interface {
                    
                
                    getAsLong(): number;
                    
                }
                export interface IntToLongFunction extends Java.Interface {
                    
                
                    applyAsLong(arg0: number): number;
                    
                }
                export interface DoubleSupplier extends Java.Interface {
                    
                
                    getAsDouble(): number;
                    
                }
                export interface LongToDoubleFunction extends Java.Interface {
                    
                
                    applyAsDouble(arg0: number): number;
                    
                }
                export interface UnaryOperator<T> extends Java.Interface, Java.java.util._function.Function<T, T> {
                    
                
                    // static
                    identity<T>(): Java.java.util._function.UnaryOperator<T>;
                    
                }
                export interface Consumer<T> extends Java.Interface {
                    
                
                    accept(arg0: T): void;
                    andThen(arg0: Java.java.util._function.Consumer<any>): Java.java.util._function.Consumer<T>;
                    
                }
                export interface LongConsumer extends Java.Interface {
                    
                
                    accept(arg0: number): void;
                    andThen(arg0: Java.java.util._function.LongConsumer): Java.java.util._function.LongConsumer;
                    
                }
                export interface DoubleConsumer extends Java.Interface {
                    
                
                    accept(arg0: number): void;
                    andThen(arg0: Java.java.util._function.DoubleConsumer): Java.java.util._function.DoubleConsumer;
                    
                }
                export interface Function<T, R> extends Java.Interface {
                    
                
                    apply(arg0: T): R;
                    compose<V>(arg0: Java.java.util._function.Function<any, any>): Java.java.util._function.Function<V, R>;
                    andThen<V>(arg0: Java.java.util._function.Function<any, any>): Java.java.util._function.Function<T, V>;
                    // static
                    identity<T>(): Java.java.util._function.Function<T, T>;
                    
                }
                export interface Predicate<T> extends Java.Interface {
                    
                
                    test(arg0: T): boolean;
                    and(arg0: Java.java.util._function.Predicate<any>): Java.java.util._function.Predicate<T>;
                    negate(): Java.java.util._function.Predicate<T>;
                    or(arg0: Java.java.util._function.Predicate<any>): Java.java.util._function.Predicate<T>;
                    // static
                    isEqual<T>(arg0: Java.Object): Java.java.util._function.Predicate<T>;
                    // static
                    not<T>(arg0: Java.java.util._function.Predicate<any>): Java.java.util._function.Predicate<T>;
                    
                }
                export interface DoubleUnaryOperator extends Java.Interface {
                    
                
                    applyAsDouble(arg0: number): number;
                    compose(arg0: Java.java.util._function.DoubleUnaryOperator): Java.java.util._function.DoubleUnaryOperator;
                    andThen(arg0: Java.java.util._function.DoubleUnaryOperator): Java.java.util._function.DoubleUnaryOperator;
                    // static
                    identity(): Java.java.util._function.DoubleUnaryOperator;
                    
                }
                export interface ObjLongConsumer<T> extends Java.Interface {
                    
                
                    accept(arg0: T, arg1: number): void;
                    
                }
                export interface IntPredicate extends Java.Interface {
                    
                
                    test(arg0: number): boolean;
                    and(arg0: Java.java.util._function.IntPredicate): Java.java.util._function.IntPredicate;
                    negate(): Java.java.util._function.IntPredicate;
                    or(arg0: Java.java.util._function.IntPredicate): Java.java.util._function.IntPredicate;
                    
                }
                export interface IntConsumer extends Java.Interface {
                    
                
                    accept(arg0: number): void;
                    andThen(arg0: Java.java.util._function.IntConsumer): Java.java.util._function.IntConsumer;
                    
                }
                export interface IntFunction<R> extends Java.Interface {
                    
                
                    apply(arg0: number): R;
                    
                }
                export interface ObjIntConsumer<T> extends Java.Interface {
                    
                
                    accept(arg0: T, arg1: number): void;
                    
                }
                export interface IntToDoubleFunction extends Java.Interface {
                    
                
                    applyAsDouble(arg0: number): number;
                    
                }
                export interface Supplier<T> extends Java.Interface {
                    
                
                    get(): T;
                    
                }
                export interface LongBinaryOperator extends Java.Interface {
                    
                
                    applyAsLong(arg0: number, arg1: number): number;
                    
                }
                export interface BiPredicate<T, U> extends Java.Interface {
                    
                
                    test(arg0: T, arg1: U): boolean;
                    and(arg0: Java.java.util._function.BiPredicate<any, any>): Java.java.util._function.BiPredicate<T, U>;
                    negate(): Java.java.util._function.BiPredicate<T, U>;
                    or(arg0: Java.java.util._function.BiPredicate<any, any>): Java.java.util._function.BiPredicate<T, U>;
                    
                }
                export interface BinaryOperator<T> extends Java.Interface, Java.java.util._function.BiFunction<T, T, T> {
                    
                
                    // static
                    minBy<T>(arg0: Java.java.util.Comparator<any>): Java.java.util._function.BinaryOperator<T>;
                    // static
                    maxBy<T>(arg0: Java.java.util.Comparator<any>): Java.java.util._function.BinaryOperator<T>;
                    
                }
                export interface LongToIntFunction extends Java.Interface {
                    
                
                    applyAsInt(arg0: number): number;
                    
                }
                export interface IntSupplier extends Java.Interface {
                    
                
                    getAsInt(): number;
                    
                }
                export interface ToDoubleFunction<T> extends Java.Interface {
                    
                
                    applyAsDouble(arg0: T): number;
                    
                }
                export interface DoubleToIntFunction extends Java.Interface {
                    
                
                    applyAsInt(arg0: number): number;
                    
                }
            }
        
            export namespace logging {
            
                export interface Handler extends Java.Object {
                    
                
                    publish(arg0: Java.java.util.logging.LogRecord): void;
                    flush(): void;
                    close(): void;
                    setFormatter(arg0: Java.java.util.logging.Formatter): void;
                    getFormatter(): Java.java.util.logging.Formatter;
                    setEncoding(arg0: string): void;
                    getEncoding(): string;
                    setFilter(arg0: Java.java.util.logging.Filter): void;
                    getFilter(): Java.java.util.logging.Filter;
                    setErrorManager(arg0: Java.java.util.logging.ErrorManager): void;
                    getErrorManager(): Java.java.util.logging.ErrorManager;
                    setLevel(arg0: Java.java.util.logging.Level): void;
                    getLevel(): Java.java.util.logging.Level;
                    isLoggable(arg0: Java.java.util.logging.LogRecord): boolean;
                    
                }
                export interface Level extends Java.Object, Java.java.io.Serializable {
                    // static
                    readonly OFF: Java.java.util.logging.Level;
                    // static
                    readonly SEVERE: Java.java.util.logging.Level;
                    // static
                    readonly WARNING: Java.java.util.logging.Level;
                    // static
                    readonly INFO: Java.java.util.logging.Level;
                    // static
                    readonly CONFIG: Java.java.util.logging.Level;
                    // static
                    readonly FINE: Java.java.util.logging.Level;
                    // static
                    readonly FINER: Java.java.util.logging.Level;
                    // static
                    readonly FINEST: Java.java.util.logging.Level;
                    // static
                    readonly ALL: Java.java.util.logging.Level;
                    
                
                    getResourceBundleName(): string;
                    getName(): string;
                    getLocalizedName(): string;
                    toString(): string;
                    intValue(): number;
                    // static
                    parse(arg0: string): Java.java.util.logging.Level;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    
                }
                export interface Filter extends Java.Interface {
                    
                
                    isLoggable(arg0: Java.java.util.logging.LogRecord): boolean;
                    
                }
                export interface ErrorManager extends Java.Object {
                    // static
                    readonly GENERIC_FAILURE: number;
                    // static
                    readonly WRITE_FAILURE: number;
                    // static
                    readonly FLUSH_FAILURE: number;
                    // static
                    readonly CLOSE_FAILURE: number;
                    // static
                    readonly OPEN_FAILURE: number;
                    // static
                    readonly FORMAT_FAILURE: number;
                    
                
                    error(arg0: string, arg1: Java.Exception, arg2: number): void;
                    
                }
                export interface LogRecord extends Java.Object, Java.java.io.Serializable {
                    
                
                    getLoggerName(): string;
                    setLoggerName(arg0: string): void;
                    getResourceBundle(): Java.java.util.ResourceBundle;
                    setResourceBundle(arg0: Java.java.util.ResourceBundle): void;
                    getResourceBundleName(): string;
                    setResourceBundleName(arg0: string): void;
                    getLevel(): Java.java.util.logging.Level;
                    setLevel(arg0: Java.java.util.logging.Level): void;
                    getSequenceNumber(): number;
                    setSequenceNumber(arg0: number): void;
                    getSourceClassName(): string;
                    setSourceClassName(arg0: string): void;
                    getSourceMethodName(): string;
                    setSourceMethodName(arg0: string): void;
                    getMessage(): string;
                    setMessage(arg0: string): void;
                    getParameters(): Java.Object[];
                    setParameters(arg0: Java.Object[]): void;
                    getThreadID(): number;
                    setThreadID(arg0: number): void;
                    getLongThreadID(): number;
                    setLongThreadID(arg0: number): Java.java.util.logging.LogRecord;
                    getMillis(): number;
                    setMillis(arg0: number): void;
                    getInstant(): Java.java.time.Instant;
                    setInstant(arg0: Java.java.time.Instant): void;
                    getThrown(): Java.Throwable;
                    setThrown(arg0: Java.Throwable): void;
                    
                }
                export interface Formatter extends Java.Object {
                    
                
                    format(arg0: Java.java.util.logging.LogRecord): string;
                    getHead(arg0: Java.java.util.logging.Handler): string;
                    getTail(arg0: Java.java.util.logging.Handler): string;
                    formatMessage(arg0: Java.java.util.logging.LogRecord): string;
                    
                }
            }
        
            export namespace stream {
            
                export interface Stream<T> extends Java.Interface, Java.java.util.stream.BaseStream<T, Java.java.util.stream.Stream<T>> {
                    
                
                    filter(arg0: Java.java.util._function.Predicate<any>): Java.java.util.stream.Stream<T>;
                    map<R>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.stream.Stream<R>;
                    mapToInt(arg0: Java.java.util._function.ToIntFunction<any>): Java.java.util.stream.IntStream;
                    mapToLong(arg0: Java.java.util._function.ToLongFunction<any>): Java.java.util.stream.LongStream;
                    mapToDouble(arg0: Java.java.util._function.ToDoubleFunction<any>): Java.java.util.stream.DoubleStream;
                    flatMap<R>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.stream.Stream<R>;
                    flatMapToInt(arg0: Java.java.util._function.Function<any, any>): Java.java.util.stream.IntStream;
                    flatMapToLong(arg0: Java.java.util._function.Function<any, any>): Java.java.util.stream.LongStream;
                    flatMapToDouble(arg0: Java.java.util._function.Function<any, any>): Java.java.util.stream.DoubleStream;
                    mapMulti<R>(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.stream.Stream<R>;
                    mapMultiToInt(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.stream.IntStream;
                    mapMultiToLong(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.stream.LongStream;
                    mapMultiToDouble(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.stream.DoubleStream;
                    distinct(): Java.java.util.stream.Stream<T>;
                    sorted(): Java.java.util.stream.Stream<T>;
                    sorted(arg0: Java.java.util.Comparator<any>): Java.java.util.stream.Stream<T>;
                    peek(arg0: Java.java.util._function.Consumer<any>): Java.java.util.stream.Stream<T>;
                    limit(arg0: number): Java.java.util.stream.Stream<T>;
                    skip(arg0: number): Java.java.util.stream.Stream<T>;
                    takeWhile(arg0: Java.java.util._function.Predicate<any>): Java.java.util.stream.Stream<T>;
                    dropWhile(arg0: Java.java.util._function.Predicate<any>): Java.java.util.stream.Stream<T>;
                    forEach(arg0: Java.java.util._function.Consumer<any>): void;
                    forEachOrdered(arg0: Java.java.util._function.Consumer<any>): void;
                    toArray(): Java.Object[];
                    toArray<A>(arg0: Java.java.util._function.IntFunction<A[]>): A[];
                    reduce(arg0: T, arg1: Java.java.util._function.BinaryOperator<T>): T;
                    reduce(arg0: Java.java.util._function.BinaryOperator<T>): Java.java.util.Optional<T>;
                    reduce<U>(arg0: U, arg1: Java.java.util._function.BiFunction<U, any, U>, arg2: Java.java.util._function.BinaryOperator<U>): U;
                    collect<R>(arg0: Java.java.util._function.Supplier<R>, arg1: Java.java.util._function.BiConsumer<R, any>, arg2: Java.java.util._function.BiConsumer<R, R>): R;
                    collect<R, A>(arg0: Java.java.util.stream.Collector<any, A, R>): R;
                    toList(): Java.java.util.List<T>;
                    min(arg0: Java.java.util.Comparator<any>): Java.java.util.Optional<T>;
                    max(arg0: Java.java.util.Comparator<any>): Java.java.util.Optional<T>;
                    count(): number;
                    anyMatch(arg0: Java.java.util._function.Predicate<any>): boolean;
                    allMatch(arg0: Java.java.util._function.Predicate<any>): boolean;
                    noneMatch(arg0: Java.java.util._function.Predicate<any>): boolean;
                    findFirst(): Java.java.util.Optional<T>;
                    findAny(): Java.java.util.Optional<T>;
                    // static
                    builder<T>(): Java.java.util.stream.Stream$Builder<T>;
                    // static
                    empty<T>(): Java.java.util.stream.Stream<T>;
                    // static
                    of<T>(arg0: T): Java.java.util.stream.Stream<T>;
                    // static
                    ofNullable<T>(arg0: T): Java.java.util.stream.Stream<T>;
                    // static
                    of<T>(arg0: T[]): Java.java.util.stream.Stream<T>;
                    // static
                    iterate<T>(arg0: T, arg1: Java.java.util._function.UnaryOperator<T>): Java.java.util.stream.Stream<T>;
                    // static
                    iterate<T>(arg0: T, arg1: Java.java.util._function.Predicate<any>, arg2: Java.java.util._function.UnaryOperator<T>): Java.java.util.stream.Stream<T>;
                    // static
                    generate<T>(arg0: Java.java.util._function.Supplier<any>): Java.java.util.stream.Stream<T>;
                    // static
                    concat<T>(arg0: Java.java.util.stream.Stream<any>, arg1: Java.java.util.stream.Stream<any>): Java.java.util.stream.Stream<T>;
                    
                }
                export interface IntStream extends Java.Interface, Java.java.util.stream.BaseStream<number, Java.java.util.stream.IntStream> {
                    
                
                    filter(arg0: Java.java.util._function.IntPredicate): Java.java.util.stream.IntStream;
                    map(arg0: Java.java.util._function.IntUnaryOperator): Java.java.util.stream.IntStream;
                    mapToObj<U>(arg0: Java.java.util._function.IntFunction<any>): Java.java.util.stream.Stream<U>;
                    mapToLong(arg0: Java.java.util._function.IntToLongFunction): Java.java.util.stream.LongStream;
                    mapToDouble(arg0: Java.java.util._function.IntToDoubleFunction): Java.java.util.stream.DoubleStream;
                    flatMap(arg0: Java.java.util._function.IntFunction<any>): Java.java.util.stream.IntStream;
                    mapMulti(arg0: Java.java.util.stream.IntStream$IntMapMultiConsumer): Java.java.util.stream.IntStream;
                    distinct(): Java.java.util.stream.IntStream;
                    sorted(): Java.java.util.stream.IntStream;
                    peek(arg0: Java.java.util._function.IntConsumer): Java.java.util.stream.IntStream;
                    limit(arg0: number): Java.java.util.stream.IntStream;
                    skip(arg0: number): Java.java.util.stream.IntStream;
                    takeWhile(arg0: Java.java.util._function.IntPredicate): Java.java.util.stream.IntStream;
                    dropWhile(arg0: Java.java.util._function.IntPredicate): Java.java.util.stream.IntStream;
                    forEach(arg0: Java.java.util._function.IntConsumer): void;
                    forEachOrdered(arg0: Java.java.util._function.IntConsumer): void;
                    toArray(): number[];
                    reduce(arg0: number, arg1: Java.java.util._function.IntBinaryOperator): number;
                    reduce(arg0: Java.java.util._function.IntBinaryOperator): Java.java.util.OptionalInt;
                    collect<R>(arg0: Java.java.util._function.Supplier<R>, arg1: Java.java.util._function.ObjIntConsumer<R>, arg2: Java.java.util._function.BiConsumer<R, R>): R;
                    sum(): number;
                    min(): Java.java.util.OptionalInt;
                    max(): Java.java.util.OptionalInt;
                    count(): number;
                    average(): Java.java.util.OptionalDouble;
                    summaryStatistics(): Java.java.util.IntSummaryStatistics;
                    anyMatch(arg0: Java.java.util._function.IntPredicate): boolean;
                    allMatch(arg0: Java.java.util._function.IntPredicate): boolean;
                    noneMatch(arg0: Java.java.util._function.IntPredicate): boolean;
                    findFirst(): Java.java.util.OptionalInt;
                    findAny(): Java.java.util.OptionalInt;
                    asLongStream(): Java.java.util.stream.LongStream;
                    asDoubleStream(): Java.java.util.stream.DoubleStream;
                    boxed(): Java.java.util.stream.Stream<number>;
                    sequential(): Java.java.util.stream.IntStream;
                    parallel(): Java.java.util.stream.IntStream;
                    iterator(): Java.java.util.PrimitiveIterator$OfInt;
                    spliterator(): Java.java.util.Spliterator$OfInt;
                    // static
                    builder(): Java.java.util.stream.IntStream$Builder;
                    // static
                    empty(): Java.java.util.stream.IntStream;
                    // static
                    of(arg0: number): Java.java.util.stream.IntStream;
                    // static
                    of(arg0: number[]): Java.java.util.stream.IntStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.IntUnaryOperator): Java.java.util.stream.IntStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.IntPredicate, arg2: Java.java.util._function.IntUnaryOperator): Java.java.util.stream.IntStream;
                    // static
                    generate(arg0: Java.java.util._function.IntSupplier): Java.java.util.stream.IntStream;
                    // static
                    range(arg0: number, arg1: number): Java.java.util.stream.IntStream;
                    // static
                    rangeClosed(arg0: number, arg1: number): Java.java.util.stream.IntStream;
                    // static
                    concat(arg0: Java.java.util.stream.IntStream, arg1: Java.java.util.stream.IntStream): Java.java.util.stream.IntStream;
                    
                }
                export interface DoubleStream extends Java.Interface, Java.java.util.stream.BaseStream<number, Java.java.util.stream.DoubleStream> {
                    
                
                    filter(arg0: Java.java.util._function.DoublePredicate): Java.java.util.stream.DoubleStream;
                    map(arg0: Java.java.util._function.DoubleUnaryOperator): Java.java.util.stream.DoubleStream;
                    mapToObj<U>(arg0: Java.java.util._function.DoubleFunction<any>): Java.java.util.stream.Stream<U>;
                    mapToInt(arg0: Java.java.util._function.DoubleToIntFunction): Java.java.util.stream.IntStream;
                    mapToLong(arg0: Java.java.util._function.DoubleToLongFunction): Java.java.util.stream.LongStream;
                    flatMap(arg0: Java.java.util._function.DoubleFunction<any>): Java.java.util.stream.DoubleStream;
                    mapMulti(arg0: Java.java.util.stream.DoubleStream$DoubleMapMultiConsumer): Java.java.util.stream.DoubleStream;
                    distinct(): Java.java.util.stream.DoubleStream;
                    sorted(): Java.java.util.stream.DoubleStream;
                    peek(arg0: Java.java.util._function.DoubleConsumer): Java.java.util.stream.DoubleStream;
                    limit(arg0: number): Java.java.util.stream.DoubleStream;
                    skip(arg0: number): Java.java.util.stream.DoubleStream;
                    takeWhile(arg0: Java.java.util._function.DoublePredicate): Java.java.util.stream.DoubleStream;
                    dropWhile(arg0: Java.java.util._function.DoublePredicate): Java.java.util.stream.DoubleStream;
                    forEach(arg0: Java.java.util._function.DoubleConsumer): void;
                    forEachOrdered(arg0: Java.java.util._function.DoubleConsumer): void;
                    toArray(): number[];
                    reduce(arg0: number, arg1: Java.java.util._function.DoubleBinaryOperator): number;
                    reduce(arg0: Java.java.util._function.DoubleBinaryOperator): Java.java.util.OptionalDouble;
                    collect<R>(arg0: Java.java.util._function.Supplier<R>, arg1: Java.java.util._function.ObjDoubleConsumer<R>, arg2: Java.java.util._function.BiConsumer<R, R>): R;
                    sum(): number;
                    min(): Java.java.util.OptionalDouble;
                    max(): Java.java.util.OptionalDouble;
                    count(): number;
                    average(): Java.java.util.OptionalDouble;
                    summaryStatistics(): Java.java.util.DoubleSummaryStatistics;
                    anyMatch(arg0: Java.java.util._function.DoublePredicate): boolean;
                    allMatch(arg0: Java.java.util._function.DoublePredicate): boolean;
                    noneMatch(arg0: Java.java.util._function.DoublePredicate): boolean;
                    findFirst(): Java.java.util.OptionalDouble;
                    findAny(): Java.java.util.OptionalDouble;
                    boxed(): Java.java.util.stream.Stream<number>;
                    sequential(): Java.java.util.stream.DoubleStream;
                    parallel(): Java.java.util.stream.DoubleStream;
                    iterator(): Java.java.util.PrimitiveIterator$OfDouble;
                    spliterator(): Java.java.util.Spliterator$OfDouble;
                    // static
                    builder(): Java.java.util.stream.DoubleStream$Builder;
                    // static
                    empty(): Java.java.util.stream.DoubleStream;
                    // static
                    of(arg0: number): Java.java.util.stream.DoubleStream;
                    // static
                    of(arg0: number[]): Java.java.util.stream.DoubleStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.DoubleUnaryOperator): Java.java.util.stream.DoubleStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.DoublePredicate, arg2: Java.java.util._function.DoubleUnaryOperator): Java.java.util.stream.DoubleStream;
                    // static
                    generate(arg0: Java.java.util._function.DoubleSupplier): Java.java.util.stream.DoubleStream;
                    // static
                    concat(arg0: Java.java.util.stream.DoubleStream, arg1: Java.java.util.stream.DoubleStream): Java.java.util.stream.DoubleStream;
                    
                }
                export interface LongStream extends Java.Interface, Java.java.util.stream.BaseStream<number, Java.java.util.stream.LongStream> {
                    
                
                    filter(arg0: Java.java.util._function.LongPredicate): Java.java.util.stream.LongStream;
                    map(arg0: Java.java.util._function.LongUnaryOperator): Java.java.util.stream.LongStream;
                    mapToObj<U>(arg0: Java.java.util._function.LongFunction<any>): Java.java.util.stream.Stream<U>;
                    mapToInt(arg0: Java.java.util._function.LongToIntFunction): Java.java.util.stream.IntStream;
                    mapToDouble(arg0: Java.java.util._function.LongToDoubleFunction): Java.java.util.stream.DoubleStream;
                    flatMap(arg0: Java.java.util._function.LongFunction<any>): Java.java.util.stream.LongStream;
                    mapMulti(arg0: Java.java.util.stream.LongStream$LongMapMultiConsumer): Java.java.util.stream.LongStream;
                    distinct(): Java.java.util.stream.LongStream;
                    sorted(): Java.java.util.stream.LongStream;
                    peek(arg0: Java.java.util._function.LongConsumer): Java.java.util.stream.LongStream;
                    limit(arg0: number): Java.java.util.stream.LongStream;
                    skip(arg0: number): Java.java.util.stream.LongStream;
                    takeWhile(arg0: Java.java.util._function.LongPredicate): Java.java.util.stream.LongStream;
                    dropWhile(arg0: Java.java.util._function.LongPredicate): Java.java.util.stream.LongStream;
                    forEach(arg0: Java.java.util._function.LongConsumer): void;
                    forEachOrdered(arg0: Java.java.util._function.LongConsumer): void;
                    toArray(): number[];
                    reduce(arg0: number, arg1: Java.java.util._function.LongBinaryOperator): number;
                    reduce(arg0: Java.java.util._function.LongBinaryOperator): Java.java.util.OptionalLong;
                    collect<R>(arg0: Java.java.util._function.Supplier<R>, arg1: Java.java.util._function.ObjLongConsumer<R>, arg2: Java.java.util._function.BiConsumer<R, R>): R;
                    sum(): number;
                    min(): Java.java.util.OptionalLong;
                    max(): Java.java.util.OptionalLong;
                    count(): number;
                    average(): Java.java.util.OptionalDouble;
                    summaryStatistics(): Java.java.util.LongSummaryStatistics;
                    anyMatch(arg0: Java.java.util._function.LongPredicate): boolean;
                    allMatch(arg0: Java.java.util._function.LongPredicate): boolean;
                    noneMatch(arg0: Java.java.util._function.LongPredicate): boolean;
                    findFirst(): Java.java.util.OptionalLong;
                    findAny(): Java.java.util.OptionalLong;
                    asDoubleStream(): Java.java.util.stream.DoubleStream;
                    boxed(): Java.java.util.stream.Stream<number>;
                    sequential(): Java.java.util.stream.LongStream;
                    parallel(): Java.java.util.stream.LongStream;
                    iterator(): Java.java.util.PrimitiveIterator$OfLong;
                    spliterator(): Java.java.util.Spliterator$OfLong;
                    // static
                    builder(): Java.java.util.stream.LongStream$Builder;
                    // static
                    empty(): Java.java.util.stream.LongStream;
                    // static
                    of(arg0: number): Java.java.util.stream.LongStream;
                    // static
                    of(arg0: number[]): Java.java.util.stream.LongStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.LongUnaryOperator): Java.java.util.stream.LongStream;
                    // static
                    iterate(arg0: number, arg1: Java.java.util._function.LongPredicate, arg2: Java.java.util._function.LongUnaryOperator): Java.java.util.stream.LongStream;
                    // static
                    generate(arg0: Java.java.util._function.LongSupplier): Java.java.util.stream.LongStream;
                    // static
                    range(arg0: number, arg1: number): Java.java.util.stream.LongStream;
                    // static
                    rangeClosed(arg0: number, arg1: number): Java.java.util.stream.LongStream;
                    // static
                    concat(arg0: Java.java.util.stream.LongStream, arg1: Java.java.util.stream.LongStream): Java.java.util.stream.LongStream;
                    
                }
                export interface IntStream$Builder extends Java.Interface, Java.java.util._function.IntConsumer {
                    
                
                    accept(arg0: number): void;
                    add(arg0: number): Java.java.util.stream.IntStream$Builder;
                    build(): Java.java.util.stream.IntStream;
                    
                }
                export interface LongStream$LongMapMultiConsumer extends Java.Interface {
                    
                
                    accept(arg0: number, arg1: Java.java.util._function.LongConsumer): void;
                    
                }
                export interface LongStream$Builder extends Java.Interface, Java.java.util._function.LongConsumer {
                    
                
                    accept(arg0: number): void;
                    add(arg0: number): Java.java.util.stream.LongStream$Builder;
                    build(): Java.java.util.stream.LongStream;
                    
                }
                export interface DoubleStream$Builder extends Java.Interface, Java.java.util._function.DoubleConsumer {
                    
                
                    accept(arg0: number): void;
                    add(arg0: number): Java.java.util.stream.DoubleStream$Builder;
                    build(): Java.java.util.stream.DoubleStream;
                    
                }
                export interface DoubleStream$DoubleMapMultiConsumer extends Java.Interface {
                    
                
                    accept(arg0: number, arg1: Java.java.util._function.DoubleConsumer): void;
                    
                }
                export interface Stream$Builder<T> extends Java.Interface, Java.java.util._function.Consumer<T> {
                    
                
                    accept(arg0: T): void;
                    add(arg0: T): Java.java.util.stream.Stream$Builder<T>;
                    build(): Java.java.util.stream.Stream<T>;
                    
                }
                export interface BaseStream<T, S> extends Java.Interface, Java.AutoCloseable {
                    
                
                    iterator(): Java.java.util.Iterator<T>;
                    spliterator(): Java.java.util.Spliterator<T>;
                    isParallel(): boolean;
                    sequential(): S;
                    parallel(): S;
                    unordered(): S;
                    onClose(arg0: Java.Runnable): S;
                    close(): void;
                    
                }
                export interface Collector<T, A, R> extends Java.Interface {
                    
                
                    supplier(): Java.java.util._function.Supplier<A>;
                    accumulator(): Java.java.util._function.BiConsumer<A, T>;
                    combiner(): Java.java.util._function.BinaryOperator<A>;
                    finisher(): Java.java.util._function.Function<A, R>;
                    characteristics(): Java.java.util.Set<Java.java.util.stream.Collector$Characteristics>;
                    // static
                    of<T, R>(arg0: Java.java.util._function.Supplier<R>, arg1: Java.java.util._function.BiConsumer<R, T>, arg2: Java.java.util._function.BinaryOperator<R>, arg3: Java.java.util.stream.Collector$Characteristics[]): Java.java.util.stream.Collector<T, R, R>;
                    // static
                    of<T, A, R>(arg0: Java.java.util._function.Supplier<A>, arg1: Java.java.util._function.BiConsumer<A, T>, arg2: Java.java.util._function.BinaryOperator<A>, arg3: Java.java.util._function.Function<A, R>, arg4: Java.java.util.stream.Collector$Characteristics[]): Java.java.util.stream.Collector<T, A, R>;
                    
                }
                export interface IntStream$IntMapMultiConsumer extends Java.Interface {
                    
                
                    accept(arg0: number, arg1: Java.java.util._function.IntConsumer): void;
                    
                }
                export interface Collector$Characteristics extends Java.Enum<Java.java.util.stream.Collector$Characteristics> {
                    // static
                    readonly CONCURRENT: Java.java.util.stream.Collector$Characteristics;
                    // static
                    readonly UNORDERED: Java.java.util.stream.Collector$Characteristics;
                    // static
                    readonly IDENTITY_FINISH: Java.java.util.stream.Collector$Characteristics;
                    
                
                    // static
                    values(): Java.java.util.stream.Collector$Characteristics[];
                    // static
                    valueOf(arg0: string): Java.java.util.stream.Collector$Characteristics;
                    
                }
            }
        
            export namespace concurrent {
            
                export interface Callable<V> extends Java.Interface {
                    
                
                    call(): V;
                    
                }
                export interface CompletableFuture<T> extends Java.Object, Java.java.util.concurrent.Future<T>, Java.java.util.concurrent.CompletionStage<T> {
                    
                
                    // static
                    supplyAsync<U>(arg0: Java.java.util._function.Supplier<U>): Java.java.util.concurrent.CompletableFuture<U>;
                    // static
                    supplyAsync<U>(arg0: Java.java.util._function.Supplier<U>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<U>;
                    // static
                    runAsync(arg0: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    // static
                    runAsync(arg0: Java.Runnable, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    // static
                    completedFuture<U>(arg0: U): Java.java.util.concurrent.CompletableFuture<U>;
                    isDone(): boolean;
                    get(): T;
                    get(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): T;
                    join(): T;
                    getNow(arg0: T): T;
                    complete(arg0: T): boolean;
                    completeExceptionally(arg0: Java.Throwable): boolean;
                    thenApply<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    thenApplyAsync<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    thenApplyAsync<U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<U>;
                    thenAccept(arg0: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenAcceptAsync(arg0: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenAcceptAsync(arg0: Java.java.util._function.Consumer<any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenRun(arg0: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenRunAsync(arg0: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenRunAsync(arg0: Java.Runnable, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenCombine<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.java.util.concurrent.CompletableFuture<V>;
                    thenCombineAsync<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.java.util.concurrent.CompletableFuture<V>;
                    thenCombineAsync<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<V>;
                    thenAcceptBoth<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenAcceptBothAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenAcceptBothAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterBoth(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterBothAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterBothAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    applyToEither<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>): Java.java.util.concurrent.CompletableFuture<U>;
                    applyToEitherAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>): Java.java.util.concurrent.CompletableFuture<U>;
                    applyToEitherAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<U>;
                    acceptEither(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    acceptEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    acceptEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterEither(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    runAfterEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    thenCompose<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    thenComposeAsync<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    thenComposeAsync<U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<U>;
                    whenComplete(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    whenCompleteAsync(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    whenCompleteAsync(arg0: Java.java.util._function.BiConsumer<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<T>;
                    handle<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    handleAsync<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<U>;
                    handleAsync<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<U>;
                    toCompletableFuture(): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionally(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionallyAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionallyAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionallyCompose(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionallyComposeAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletableFuture<T>;
                    exceptionallyComposeAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<T>;
                    // static
                    allOf(arg0: Java.java.util.concurrent.CompletableFuture<any>[]): Java.java.util.concurrent.CompletableFuture<Java.Void>;
                    // static
                    anyOf(arg0: Java.java.util.concurrent.CompletableFuture<any>[]): Java.java.util.concurrent.CompletableFuture<Java.Object>;
                    cancel(arg0: boolean): boolean;
                    isCancelled(): boolean;
                    isCompletedExceptionally(): boolean;
                    obtrudeValue(arg0: T): void;
                    obtrudeException(arg0: Java.Throwable): void;
                    getNumberOfDependents(): number;
                    toString(): string;
                    newIncompleteFuture<U>(): Java.java.util.concurrent.CompletableFuture<U>;
                    defaultExecutor(): Java.java.util.concurrent.Executor;
                    copy(): Java.java.util.concurrent.CompletableFuture<T>;
                    minimalCompletionStage(): Java.java.util.concurrent.CompletionStage<T>;
                    completeAsync(arg0: Java.java.util._function.Supplier<any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletableFuture<T>;
                    completeAsync(arg0: Java.java.util._function.Supplier<any>): Java.java.util.concurrent.CompletableFuture<T>;
                    orTimeout(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): Java.java.util.concurrent.CompletableFuture<T>;
                    completeOnTimeout(arg0: T, arg1: number, arg2: Java.java.util.concurrent.TimeUnit): Java.java.util.concurrent.CompletableFuture<T>;
                    // static
                    delayedExecutor(arg0: number, arg1: Java.java.util.concurrent.TimeUnit, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.Executor;
                    // static
                    delayedExecutor(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): Java.java.util.concurrent.Executor;
                    // static
                    completedStage<U>(arg0: U): Java.java.util.concurrent.CompletionStage<U>;
                    // static
                    failedFuture<U>(arg0: Java.Throwable): Java.java.util.concurrent.CompletableFuture<U>;
                    // static
                    failedStage<U>(arg0: Java.Throwable): Java.java.util.concurrent.CompletionStage<U>;
                    
                }
                export interface ExecutorService extends Java.Interface, Java.java.util.concurrent.Executor {
                    
                
                    shutdown(): void;
                    shutdownNow(): Java.java.util.List<Java.Runnable>;
                    isShutdown(): boolean;
                    isTerminated(): boolean;
                    awaitTermination(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): boolean;
                    submit<T>(arg0: Java.java.util.concurrent.Callable<T>): Java.java.util.concurrent.Future<T>;
                    submit<T>(arg0: Java.Runnable, arg1: T): Java.java.util.concurrent.Future<T>;
                    submit(arg0: Java.Runnable): Java.java.util.concurrent.Future<any>;
                    invokeAll<T>(arg0: Java.java.util.Collection<any>): Java.java.util.List<Java.java.util.concurrent.Future<T>>;
                    invokeAll<T>(arg0: Java.java.util.Collection<any>, arg1: number, arg2: Java.java.util.concurrent.TimeUnit): Java.java.util.List<Java.java.util.concurrent.Future<T>>;
                    invokeAny<T>(arg0: Java.java.util.Collection<any>): T;
                    invokeAny<T>(arg0: Java.java.util.Collection<any>, arg1: number, arg2: Java.java.util.concurrent.TimeUnit): T;
                    
                }
                export interface TimeUnit extends Java.Enum<Java.java.util.concurrent.TimeUnit> {
                    // static
                    readonly NANOSECONDS: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly MICROSECONDS: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly MILLISECONDS: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly SECONDS: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly MINUTES: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly HOURS: Java.java.util.concurrent.TimeUnit;
                    // static
                    readonly DAYS: Java.java.util.concurrent.TimeUnit;
                    
                
                    // static
                    values(): Java.java.util.concurrent.TimeUnit[];
                    // static
                    valueOf(arg0: string): Java.java.util.concurrent.TimeUnit;
                    convert(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): number;
                    convert(arg0: Java.java.time.Duration): number;
                    toNanos(arg0: number): number;
                    toMicros(arg0: number): number;
                    toMillis(arg0: number): number;
                    toSeconds(arg0: number): number;
                    toMinutes(arg0: number): number;
                    toHours(arg0: number): number;
                    toDays(arg0: number): number;
                    timedWait(arg0: Java.Object, arg1: number): void;
                    timedJoin(arg0: Java.Thread, arg1: number): void;
                    sleep(arg0: number): void;
                    toChronoUnit(): Java.java.time.temporal.ChronoUnit;
                    // static
                    of(arg0: Java.java.time.temporal.ChronoUnit): Java.java.util.concurrent.TimeUnit;
                    
                }
                export interface Future<V> extends Java.Interface {
                    
                
                    cancel(arg0: boolean): boolean;
                    isCancelled(): boolean;
                    isDone(): boolean;
                    get(): V;
                    get(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): V;
                    
                }
                export interface Executor extends Java.Interface {
                    
                
                    execute(arg0: Java.Runnable): void;
                    
                }
                export interface CompletionStage<T> extends Java.Interface {
                    
                
                    thenApply<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletionStage<U>;
                    thenApplyAsync<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletionStage<U>;
                    thenApplyAsync<U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<U>;
                    thenAccept(arg0: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenAcceptAsync(arg0: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenAcceptAsync(arg0: Java.java.util._function.Consumer<any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenRun(arg0: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenRunAsync(arg0: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenRunAsync(arg0: Java.Runnable, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenCombine<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.java.util.concurrent.CompletionStage<V>;
                    thenCombineAsync<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.java.util.concurrent.CompletionStage<V>;
                    thenCombineAsync<U, V>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiFunction<any, any, any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<V>;
                    thenAcceptBoth<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenAcceptBothAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenAcceptBothAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.BiConsumer<any, any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterBoth(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterBothAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterBothAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    applyToEither<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>): Java.java.util.concurrent.CompletionStage<U>;
                    applyToEitherAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>): Java.java.util.concurrent.CompletionStage<U>;
                    applyToEitherAsync<U>(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Function<any, U>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<U>;
                    acceptEither(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    acceptEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    acceptEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.java.util._function.Consumer<any>, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterEither(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    runAfterEitherAsync(arg0: Java.java.util.concurrent.CompletionStage<any>, arg1: Java.Runnable, arg2: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<Java.Void>;
                    thenCompose<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletionStage<U>;
                    thenComposeAsync<U>(arg0: Java.java.util._function.Function<any, any>): Java.java.util.concurrent.CompletionStage<U>;
                    thenComposeAsync<U>(arg0: Java.java.util._function.Function<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<U>;
                    handle<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<U>;
                    handleAsync<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<U>;
                    handleAsync<U>(arg0: Java.java.util._function.BiFunction<any, Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<U>;
                    whenComplete(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletionStage<T>;
                    whenCompleteAsync(arg0: Java.java.util._function.BiConsumer<any, any>): Java.java.util.concurrent.CompletionStage<T>;
                    whenCompleteAsync(arg0: Java.java.util._function.BiConsumer<any, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionally(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionallyAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionallyAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionallyCompose(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionallyComposeAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>): Java.java.util.concurrent.CompletionStage<T>;
                    exceptionallyComposeAsync(arg0: Java.java.util._function.Function<Java.Throwable, any>, arg1: Java.java.util.concurrent.Executor): Java.java.util.concurrent.CompletionStage<T>;
                    toCompletableFuture(): Java.java.util.concurrent.CompletableFuture<T>;
                    
                }
            }
        }
    
        export namespace time {
        
            export interface Instant extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.Instant>, Java.java.io.Serializable {
                // static
                readonly EPOCH: Java.java.time.Instant;
                // static
                readonly MIN: Java.java.time.Instant;
                // static
                readonly MAX: Java.java.time.Instant;
                
            
                // static
                now(): Java.java.time.Instant;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.Instant;
                // static
                ofEpochSecond(arg0: number): Java.java.time.Instant;
                // static
                ofEpochSecond(arg0: number, arg1: number): Java.java.time.Instant;
                // static
                ofEpochMilli(arg0: number): Java.java.time.Instant;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.Instant;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.Instant;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getEpochSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.Instant;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.Instant;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.Instant;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Instant;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.Instant;
                plusSeconds(arg0: number): Java.java.time.Instant;
                plusMillis(arg0: number): Java.java.time.Instant;
                plusNanos(arg0: number): Java.java.time.Instant;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Instant;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.Instant;
                minusSeconds(arg0: number): Java.java.time.Instant;
                minusMillis(arg0: number): Java.java.time.Instant;
                minusNanos(arg0: number): Java.java.time.Instant;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                atOffset(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                atZone(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                toEpochMilli(): number;
                compareTo(arg0: Java.java.time.Instant): number;
                isAfter(arg0: Java.java.time.Instant): boolean;
                isBefore(arg0: Java.java.time.Instant): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface LocalTime extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.LocalTime>, Java.java.io.Serializable {
                // static
                readonly MIN: Java.java.time.LocalTime;
                // static
                readonly MAX: Java.java.time.LocalTime;
                // static
                readonly MIDNIGHT: Java.java.time.LocalTime;
                // static
                readonly NOON: Java.java.time.LocalTime;
                
            
                // static
                now(): Java.java.time.LocalTime;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.LocalTime;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.LocalTime;
                // static
                of(arg0: number, arg1: number): Java.java.time.LocalTime;
                // static
                of(arg0: number, arg1: number, arg2: number): Java.java.time.LocalTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number): Java.java.time.LocalTime;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.LocalTime;
                // static
                ofSecondOfDay(arg0: number): Java.java.time.LocalTime;
                // static
                ofNanoOfDay(arg0: number): Java.java.time.LocalTime;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.LocalTime;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.LocalTime;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.LocalTime;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getHour(): number;
                getMinute(): number;
                getSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.LocalTime;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.LocalTime;
                withHour(arg0: number): Java.java.time.LocalTime;
                withMinute(arg0: number): Java.java.time.LocalTime;
                withSecond(arg0: number): Java.java.time.LocalTime;
                withNano(arg0: number): Java.java.time.LocalTime;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalTime;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalTime;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalTime;
                plusHours(arg0: number): Java.java.time.LocalTime;
                plusMinutes(arg0: number): Java.java.time.LocalTime;
                plusSeconds(arg0: number): Java.java.time.LocalTime;
                plusNanos(arg0: number): Java.java.time.LocalTime;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalTime;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalTime;
                minusHours(arg0: number): Java.java.time.LocalTime;
                minusMinutes(arg0: number): Java.java.time.LocalTime;
                minusSeconds(arg0: number): Java.java.time.LocalTime;
                minusNanos(arg0: number): Java.java.time.LocalTime;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                atDate(arg0: Java.java.time.LocalDate): Java.java.time.LocalDateTime;
                atOffset(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetTime;
                toSecondOfDay(): number;
                toNanoOfDay(): number;
                toEpochSecond(arg0: Java.java.time.LocalDate, arg1: Java.java.time.ZoneOffset): number;
                compareTo(arg0: Java.java.time.LocalTime): number;
                isAfter(arg0: Java.java.time.LocalTime): boolean;
                isBefore(arg0: Java.java.time.LocalTime): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Duration extends Java.Object, Java.java.time.temporal.TemporalAmount, Java.Comparable<Java.java.time.Duration>, Java.java.io.Serializable {
                // static
                readonly ZERO: Java.java.time.Duration;
                
            
                // static
                ofDays(arg0: number): Java.java.time.Duration;
                // static
                ofHours(arg0: number): Java.java.time.Duration;
                // static
                ofMinutes(arg0: number): Java.java.time.Duration;
                // static
                ofSeconds(arg0: number): Java.java.time.Duration;
                // static
                ofSeconds(arg0: number, arg1: number): Java.java.time.Duration;
                // static
                ofMillis(arg0: number): Java.java.time.Duration;
                // static
                ofNanos(arg0: number): Java.java.time.Duration;
                // static
                of(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.Duration;
                // static
                from(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Duration;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.Duration;
                // static
                between(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.Temporal): Java.java.time.Duration;
                get(arg0: Java.java.time.temporal.TemporalUnit): number;
                getUnits(): Java.java.util.List<Java.java.time.temporal.TemporalUnit>;
                isZero(): boolean;
                isNegative(): boolean;
                getSeconds(): number;
                getNano(): number;
                withSeconds(arg0: number): Java.java.time.Duration;
                withNanos(arg0: number): Java.java.time.Duration;
                plus(arg0: Java.java.time.Duration): Java.java.time.Duration;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.Duration;
                plusDays(arg0: number): Java.java.time.Duration;
                plusHours(arg0: number): Java.java.time.Duration;
                plusMinutes(arg0: number): Java.java.time.Duration;
                plusSeconds(arg0: number): Java.java.time.Duration;
                plusMillis(arg0: number): Java.java.time.Duration;
                plusNanos(arg0: number): Java.java.time.Duration;
                minus(arg0: Java.java.time.Duration): Java.java.time.Duration;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.Duration;
                minusDays(arg0: number): Java.java.time.Duration;
                minusHours(arg0: number): Java.java.time.Duration;
                minusMinutes(arg0: number): Java.java.time.Duration;
                minusSeconds(arg0: number): Java.java.time.Duration;
                minusMillis(arg0: number): Java.java.time.Duration;
                minusNanos(arg0: number): Java.java.time.Duration;
                multipliedBy(arg0: number): Java.java.time.Duration;
                dividedBy(arg0: number): Java.java.time.Duration;
                dividedBy(arg0: Java.java.time.Duration): number;
                negated(): Java.java.time.Duration;
                abs(): Java.java.time.Duration;
                addTo(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                subtractFrom(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                toDays(): number;
                toHours(): number;
                toMinutes(): number;
                toSeconds(): number;
                toMillis(): number;
                toNanos(): number;
                toDaysPart(): number;
                toHoursPart(): number;
                toMinutesPart(): number;
                toSecondsPart(): number;
                toMillisPart(): number;
                toNanosPart(): number;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.Duration;
                compareTo(arg0: Java.java.time.Duration): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface LocalDate extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.java.time.chrono.ChronoLocalDate, Java.java.io.Serializable {
                // static
                readonly MIN: Java.java.time.LocalDate;
                // static
                readonly MAX: Java.java.time.LocalDate;
                // static
                readonly EPOCH: Java.java.time.LocalDate;
                
            
                // static
                now(): Java.java.time.LocalDate;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.LocalDate;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.LocalDate;
                // static
                of(arg0: number, arg1: Java.java.time.Month, arg2: number): Java.java.time.LocalDate;
                // static
                of(arg0: number, arg1: number, arg2: number): Java.java.time.LocalDate;
                // static
                ofYearDay(arg0: number, arg1: number): Java.java.time.LocalDate;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.LocalDate;
                // static
                ofEpochDay(arg0: number): Java.java.time.LocalDate;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.LocalDate;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.LocalDate;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.LocalDate;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getChronology(): Java.java.time.chrono.IsoChronology;
                getEra(): Java.java.time.chrono.IsoEra;
                getYear(): number;
                getMonthValue(): number;
                getMonth(): Java.java.time.Month;
                getDayOfMonth(): number;
                getDayOfYear(): number;
                getDayOfWeek(): Java.java.time.DayOfWeek;
                isLeapYear(): boolean;
                lengthOfMonth(): number;
                lengthOfYear(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.LocalDate;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.LocalDate;
                withYear(arg0: number): Java.java.time.LocalDate;
                withMonth(arg0: number): Java.java.time.LocalDate;
                withDayOfMonth(arg0: number): Java.java.time.LocalDate;
                withDayOfYear(arg0: number): Java.java.time.LocalDate;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalDate;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalDate;
                plusYears(arg0: number): Java.java.time.LocalDate;
                plusMonths(arg0: number): Java.java.time.LocalDate;
                plusWeeks(arg0: number): Java.java.time.LocalDate;
                plusDays(arg0: number): Java.java.time.LocalDate;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalDate;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalDate;
                minusYears(arg0: number): Java.java.time.LocalDate;
                minusMonths(arg0: number): Java.java.time.LocalDate;
                minusWeeks(arg0: number): Java.java.time.LocalDate;
                minusDays(arg0: number): Java.java.time.LocalDate;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                until(arg0: Java.java.time.chrono.ChronoLocalDate): Java.java.time.Period;
                datesUntil(arg0: Java.java.time.LocalDate): Java.java.util.stream.Stream<Java.java.time.LocalDate>;
                datesUntil(arg0: Java.java.time.LocalDate, arg1: Java.java.time.Period): Java.java.util.stream.Stream<Java.java.time.LocalDate>;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                atTime(arg0: Java.java.time.LocalTime): Java.java.time.LocalDateTime;
                atTime(arg0: number, arg1: number): Java.java.time.LocalDateTime;
                atTime(arg0: number, arg1: number, arg2: number): Java.java.time.LocalDateTime;
                atTime(arg0: number, arg1: number, arg2: number, arg3: number): Java.java.time.LocalDateTime;
                atTime(arg0: Java.java.time.OffsetTime): Java.java.time.OffsetDateTime;
                atStartOfDay(): Java.java.time.LocalDateTime;
                atStartOfDay(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                toEpochDay(): number;
                toEpochSecond(arg0: Java.java.time.LocalTime, arg1: Java.java.time.ZoneOffset): number;
                compareTo(arg0: Java.java.time.chrono.ChronoLocalDate): number;
                isAfter(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                isBefore(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                isEqual(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface ZoneId extends Java.Object, Java.java.io.Serializable {
                // static
                readonly SHORT_IDS: Java.java.util.Map<string, string>;
                
            
                // static
                systemDefault(): Java.java.time.ZoneId;
                // static
                getAvailableZoneIds(): Java.java.util.Set<string>;
                // static
                of(arg0: string, arg1: Java.java.util.Map<string, string>): Java.java.time.ZoneId;
                // static
                of(arg0: string): Java.java.time.ZoneId;
                // static
                ofOffset(arg0: string, arg1: Java.java.time.ZoneOffset): Java.java.time.ZoneId;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.ZoneId;
                getId(): string;
                getDisplayName(arg0: Java.java.time.format.TextStyle, arg1: Java.java.util.Locale): string;
                getRules(): Java.java.time.zone.ZoneRules;
                normalized(): Java.java.time.ZoneId;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface LocalDateTime extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.java.time.chrono.ChronoLocalDateTime<Java.java.time.LocalDate>, Java.java.io.Serializable {
                // static
                readonly MIN: Java.java.time.LocalDateTime;
                // static
                readonly MAX: Java.java.time.LocalDateTime;
                
            
                // static
                now(): Java.java.time.LocalDateTime;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.LocalDateTime;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: Java.java.time.Month, arg2: number, arg3: number, arg4: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: Java.java.time.Month, arg2: number, arg3: number, arg4: number, arg5: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: Java.java.time.Month, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number): Java.java.time.LocalDateTime;
                // static
                of(arg0: Java.java.time.LocalDate, arg1: Java.java.time.LocalTime): Java.java.time.LocalDateTime;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.LocalDateTime;
                // static
                ofEpochSecond(arg0: number, arg1: number, arg2: Java.java.time.ZoneOffset): Java.java.time.LocalDateTime;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.LocalDateTime;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.LocalDateTime;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.LocalDateTime;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                toLocalDate(): Java.java.time.LocalDate;
                getYear(): number;
                getMonthValue(): number;
                getMonth(): Java.java.time.Month;
                getDayOfMonth(): number;
                getDayOfYear(): number;
                getDayOfWeek(): Java.java.time.DayOfWeek;
                toLocalTime(): Java.java.time.LocalTime;
                getHour(): number;
                getMinute(): number;
                getSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.LocalDateTime;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.LocalDateTime;
                withYear(arg0: number): Java.java.time.LocalDateTime;
                withMonth(arg0: number): Java.java.time.LocalDateTime;
                withDayOfMonth(arg0: number): Java.java.time.LocalDateTime;
                withDayOfYear(arg0: number): Java.java.time.LocalDateTime;
                withHour(arg0: number): Java.java.time.LocalDateTime;
                withMinute(arg0: number): Java.java.time.LocalDateTime;
                withSecond(arg0: number): Java.java.time.LocalDateTime;
                withNano(arg0: number): Java.java.time.LocalDateTime;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalDateTime;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalDateTime;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalDateTime;
                plusYears(arg0: number): Java.java.time.LocalDateTime;
                plusMonths(arg0: number): Java.java.time.LocalDateTime;
                plusWeeks(arg0: number): Java.java.time.LocalDateTime;
                plusDays(arg0: number): Java.java.time.LocalDateTime;
                plusHours(arg0: number): Java.java.time.LocalDateTime;
                plusMinutes(arg0: number): Java.java.time.LocalDateTime;
                plusSeconds(arg0: number): Java.java.time.LocalDateTime;
                plusNanos(arg0: number): Java.java.time.LocalDateTime;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.LocalDateTime;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.LocalDateTime;
                minusYears(arg0: number): Java.java.time.LocalDateTime;
                minusMonths(arg0: number): Java.java.time.LocalDateTime;
                minusWeeks(arg0: number): Java.java.time.LocalDateTime;
                minusDays(arg0: number): Java.java.time.LocalDateTime;
                minusHours(arg0: number): Java.java.time.LocalDateTime;
                minusMinutes(arg0: number): Java.java.time.LocalDateTime;
                minusSeconds(arg0: number): Java.java.time.LocalDateTime;
                minusNanos(arg0: number): Java.java.time.LocalDateTime;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                atOffset(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                atZone(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                compareTo(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): number;
                isAfter(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                isBefore(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                isEqual(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Month extends Java.Enum<Java.java.time.Month>, Java.java.time.temporal.TemporalAccessor, Java.java.time.temporal.TemporalAdjuster {
                // static
                readonly JANUARY: Java.java.time.Month;
                // static
                readonly FEBRUARY: Java.java.time.Month;
                // static
                readonly MARCH: Java.java.time.Month;
                // static
                readonly APRIL: Java.java.time.Month;
                // static
                readonly MAY: Java.java.time.Month;
                // static
                readonly JUNE: Java.java.time.Month;
                // static
                readonly JULY: Java.java.time.Month;
                // static
                readonly AUGUST: Java.java.time.Month;
                // static
                readonly SEPTEMBER: Java.java.time.Month;
                // static
                readonly OCTOBER: Java.java.time.Month;
                // static
                readonly NOVEMBER: Java.java.time.Month;
                // static
                readonly DECEMBER: Java.java.time.Month;
                
            
                // static
                values(): Java.java.time.Month[];
                // static
                valueOf(arg0: string): Java.java.time.Month;
                // static
                of(arg0: number): Java.java.time.Month;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.Month;
                getValue(): number;
                getDisplayName(arg0: Java.java.time.format.TextStyle, arg1: Java.java.util.Locale): string;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                plus(arg0: number): Java.java.time.Month;
                minus(arg0: number): Java.java.time.Month;
                length(arg0: boolean): number;
                minLength(): number;
                maxLength(): number;
                firstDayOfYear(arg0: boolean): number;
                firstMonthOfQuarter(): Java.java.time.Month;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                
            }
            export interface DayOfWeek extends Java.Enum<Java.java.time.DayOfWeek>, Java.java.time.temporal.TemporalAccessor, Java.java.time.temporal.TemporalAdjuster {
                // static
                readonly MONDAY: Java.java.time.DayOfWeek;
                // static
                readonly TUESDAY: Java.java.time.DayOfWeek;
                // static
                readonly WEDNESDAY: Java.java.time.DayOfWeek;
                // static
                readonly THURSDAY: Java.java.time.DayOfWeek;
                // static
                readonly FRIDAY: Java.java.time.DayOfWeek;
                // static
                readonly SATURDAY: Java.java.time.DayOfWeek;
                // static
                readonly SUNDAY: Java.java.time.DayOfWeek;
                
            
                // static
                values(): Java.java.time.DayOfWeek[];
                // static
                valueOf(arg0: string): Java.java.time.DayOfWeek;
                // static
                of(arg0: number): Java.java.time.DayOfWeek;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.DayOfWeek;
                getValue(): number;
                getDisplayName(arg0: Java.java.time.format.TextStyle, arg1: Java.java.util.Locale): string;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                plus(arg0: number): Java.java.time.DayOfWeek;
                minus(arg0: number): Java.java.time.DayOfWeek;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                
            }
            export interface OffsetDateTime extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.OffsetDateTime>, Java.java.io.Serializable {
                // static
                readonly MIN: Java.java.time.OffsetDateTime;
                // static
                readonly MAX: Java.java.time.OffsetDateTime;
                
            
                // static
                timeLineOrder(): Java.java.util.Comparator<Java.java.time.OffsetDateTime>;
                // static
                now(): Java.java.time.OffsetDateTime;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.OffsetDateTime;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.OffsetDateTime;
                // static
                of(arg0: Java.java.time.LocalDate, arg1: Java.java.time.LocalTime, arg2: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                // static
                of(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.OffsetDateTime;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.OffsetDateTime;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.OffsetDateTime;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.OffsetDateTime;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getOffset(): Java.java.time.ZoneOffset;
                withOffsetSameLocal(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                withOffsetSameInstant(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetDateTime;
                toLocalDateTime(): Java.java.time.LocalDateTime;
                toLocalDate(): Java.java.time.LocalDate;
                getYear(): number;
                getMonthValue(): number;
                getMonth(): Java.java.time.Month;
                getDayOfMonth(): number;
                getDayOfYear(): number;
                getDayOfWeek(): Java.java.time.DayOfWeek;
                toLocalTime(): Java.java.time.LocalTime;
                getHour(): number;
                getMinute(): number;
                getSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.OffsetDateTime;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.OffsetDateTime;
                withYear(arg0: number): Java.java.time.OffsetDateTime;
                withMonth(arg0: number): Java.java.time.OffsetDateTime;
                withDayOfMonth(arg0: number): Java.java.time.OffsetDateTime;
                withDayOfYear(arg0: number): Java.java.time.OffsetDateTime;
                withHour(arg0: number): Java.java.time.OffsetDateTime;
                withMinute(arg0: number): Java.java.time.OffsetDateTime;
                withSecond(arg0: number): Java.java.time.OffsetDateTime;
                withNano(arg0: number): Java.java.time.OffsetDateTime;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetDateTime;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.OffsetDateTime;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetDateTime;
                plusYears(arg0: number): Java.java.time.OffsetDateTime;
                plusMonths(arg0: number): Java.java.time.OffsetDateTime;
                plusWeeks(arg0: number): Java.java.time.OffsetDateTime;
                plusDays(arg0: number): Java.java.time.OffsetDateTime;
                plusHours(arg0: number): Java.java.time.OffsetDateTime;
                plusMinutes(arg0: number): Java.java.time.OffsetDateTime;
                plusSeconds(arg0: number): Java.java.time.OffsetDateTime;
                plusNanos(arg0: number): Java.java.time.OffsetDateTime;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.OffsetDateTime;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetDateTime;
                minusYears(arg0: number): Java.java.time.OffsetDateTime;
                minusMonths(arg0: number): Java.java.time.OffsetDateTime;
                minusWeeks(arg0: number): Java.java.time.OffsetDateTime;
                minusDays(arg0: number): Java.java.time.OffsetDateTime;
                minusHours(arg0: number): Java.java.time.OffsetDateTime;
                minusMinutes(arg0: number): Java.java.time.OffsetDateTime;
                minusSeconds(arg0: number): Java.java.time.OffsetDateTime;
                minusNanos(arg0: number): Java.java.time.OffsetDateTime;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                atZoneSameInstant(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                atZoneSimilarLocal(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                toOffsetTime(): Java.java.time.OffsetTime;
                toZonedDateTime(): Java.java.time.ZonedDateTime;
                toInstant(): Java.java.time.Instant;
                toEpochSecond(): number;
                compareTo(arg0: Java.java.time.OffsetDateTime): number;
                isAfter(arg0: Java.java.time.OffsetDateTime): boolean;
                isBefore(arg0: Java.java.time.OffsetDateTime): boolean;
                isEqual(arg0: Java.java.time.OffsetDateTime): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Clock extends Java.Object {
                
            
                // static
                systemUTC(): Java.java.time.Clock;
                // static
                systemDefaultZone(): Java.java.time.Clock;
                // static
                system(arg0: Java.java.time.ZoneId): Java.java.time.Clock;
                // static
                tickMillis(arg0: Java.java.time.ZoneId): Java.java.time.Clock;
                // static
                tickSeconds(arg0: Java.java.time.ZoneId): Java.java.time.Clock;
                // static
                tickMinutes(arg0: Java.java.time.ZoneId): Java.java.time.Clock;
                // static
                tick(arg0: Java.java.time.Clock, arg1: Java.java.time.Duration): Java.java.time.Clock;
                // static
                fixed(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.Clock;
                // static
                offset(arg0: Java.java.time.Clock, arg1: Java.java.time.Duration): Java.java.time.Clock;
                getZone(): Java.java.time.ZoneId;
                withZone(arg0: Java.java.time.ZoneId): Java.java.time.Clock;
                millis(): number;
                instant(): Java.java.time.Instant;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                
            }
            export interface ZonedDateTime extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.chrono.ChronoZonedDateTime<Java.java.time.LocalDate>, Java.java.io.Serializable {
                
            
                // static
                now(): Java.java.time.ZonedDateTime;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.ZonedDateTime;
                // static
                of(arg0: Java.java.time.LocalDate, arg1: Java.java.time.LocalTime, arg2: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                of(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                ofLocal(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneId, arg2: Java.java.time.ZoneOffset): Java.java.time.ZonedDateTime;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                ofInstant(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset, arg2: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                ofStrict(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset, arg2: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.ZonedDateTime;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.ZonedDateTime;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.ZonedDateTime;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getOffset(): Java.java.time.ZoneOffset;
                withEarlierOffsetAtOverlap(): Java.java.time.ZonedDateTime;
                withLaterOffsetAtOverlap(): Java.java.time.ZonedDateTime;
                getZone(): Java.java.time.ZoneId;
                withZoneSameLocal(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                withZoneSameInstant(arg0: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                withFixedOffsetZone(): Java.java.time.ZonedDateTime;
                toLocalDateTime(): Java.java.time.LocalDateTime;
                toLocalDate(): Java.java.time.LocalDate;
                getYear(): number;
                getMonthValue(): number;
                getMonth(): Java.java.time.Month;
                getDayOfMonth(): number;
                getDayOfYear(): number;
                getDayOfWeek(): Java.java.time.DayOfWeek;
                toLocalTime(): Java.java.time.LocalTime;
                getHour(): number;
                getMinute(): number;
                getSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.ZonedDateTime;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.ZonedDateTime;
                withYear(arg0: number): Java.java.time.ZonedDateTime;
                withMonth(arg0: number): Java.java.time.ZonedDateTime;
                withDayOfMonth(arg0: number): Java.java.time.ZonedDateTime;
                withDayOfYear(arg0: number): Java.java.time.ZonedDateTime;
                withHour(arg0: number): Java.java.time.ZonedDateTime;
                withMinute(arg0: number): Java.java.time.ZonedDateTime;
                withSecond(arg0: number): Java.java.time.ZonedDateTime;
                withNano(arg0: number): Java.java.time.ZonedDateTime;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.ZonedDateTime;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.ZonedDateTime;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.ZonedDateTime;
                plusYears(arg0: number): Java.java.time.ZonedDateTime;
                plusMonths(arg0: number): Java.java.time.ZonedDateTime;
                plusWeeks(arg0: number): Java.java.time.ZonedDateTime;
                plusDays(arg0: number): Java.java.time.ZonedDateTime;
                plusHours(arg0: number): Java.java.time.ZonedDateTime;
                plusMinutes(arg0: number): Java.java.time.ZonedDateTime;
                plusSeconds(arg0: number): Java.java.time.ZonedDateTime;
                plusNanos(arg0: number): Java.java.time.ZonedDateTime;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.ZonedDateTime;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.ZonedDateTime;
                minusYears(arg0: number): Java.java.time.ZonedDateTime;
                minusMonths(arg0: number): Java.java.time.ZonedDateTime;
                minusWeeks(arg0: number): Java.java.time.ZonedDateTime;
                minusDays(arg0: number): Java.java.time.ZonedDateTime;
                minusHours(arg0: number): Java.java.time.ZonedDateTime;
                minusMinutes(arg0: number): Java.java.time.ZonedDateTime;
                minusSeconds(arg0: number): Java.java.time.ZonedDateTime;
                minusNanos(arg0: number): Java.java.time.ZonedDateTime;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                toOffsetDateTime(): Java.java.time.OffsetDateTime;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface ZoneOffset extends Java.java.time.ZoneId, Java.java.time.temporal.TemporalAccessor, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.ZoneOffset>, Java.java.io.Serializable {
                // static
                readonly UTC: Java.java.time.ZoneOffset;
                // static
                readonly MIN: Java.java.time.ZoneOffset;
                // static
                readonly MAX: Java.java.time.ZoneOffset;
                
            
                // static
                of(arg0: string): Java.java.time.ZoneOffset;
                // static
                ofHours(arg0: number): Java.java.time.ZoneOffset;
                // static
                ofHoursMinutes(arg0: number, arg1: number): Java.java.time.ZoneOffset;
                // static
                ofHoursMinutesSeconds(arg0: number, arg1: number, arg2: number): Java.java.time.ZoneOffset;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.ZoneOffset;
                // static
                ofTotalSeconds(arg0: number): Java.java.time.ZoneOffset;
                getTotalSeconds(): number;
                getId(): string;
                getRules(): Java.java.time.zone.ZoneRules;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                compareTo(arg0: Java.java.time.ZoneOffset): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Period extends Java.Object, Java.java.time.chrono.ChronoPeriod, Java.java.io.Serializable {
                // static
                readonly ZERO: Java.java.time.Period;
                
            
                // static
                ofYears(arg0: number): Java.java.time.Period;
                // static
                ofMonths(arg0: number): Java.java.time.Period;
                // static
                ofWeeks(arg0: number): Java.java.time.Period;
                // static
                ofDays(arg0: number): Java.java.time.Period;
                // static
                of(arg0: number, arg1: number, arg2: number): Java.java.time.Period;
                // static
                from(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Period;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.Period;
                // static
                between(arg0: Java.java.time.LocalDate, arg1: Java.java.time.LocalDate): Java.java.time.Period;
                get(arg0: Java.java.time.temporal.TemporalUnit): number;
                getUnits(): Java.java.util.List<Java.java.time.temporal.TemporalUnit>;
                getChronology(): Java.java.time.chrono.IsoChronology;
                isZero(): boolean;
                isNegative(): boolean;
                getYears(): number;
                getMonths(): number;
                getDays(): number;
                withYears(arg0: number): Java.java.time.Period;
                withMonths(arg0: number): Java.java.time.Period;
                withDays(arg0: number): Java.java.time.Period;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Period;
                plusYears(arg0: number): Java.java.time.Period;
                plusMonths(arg0: number): Java.java.time.Period;
                plusDays(arg0: number): Java.java.time.Period;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.Period;
                minusYears(arg0: number): Java.java.time.Period;
                minusMonths(arg0: number): Java.java.time.Period;
                minusDays(arg0: number): Java.java.time.Period;
                multipliedBy(arg0: number): Java.java.time.Period;
                negated(): Java.java.time.Period;
                normalized(): Java.java.time.Period;
                toTotalMonths(): number;
                addTo(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                subtractFrom(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface OffsetTime extends Java.Object, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.OffsetTime>, Java.java.io.Serializable {
                // static
                readonly MIN: Java.java.time.OffsetTime;
                // static
                readonly MAX: Java.java.time.OffsetTime;
                
            
                // static
                now(): Java.java.time.OffsetTime;
                // static
                now(arg0: Java.java.time.ZoneId): Java.java.time.OffsetTime;
                // static
                now(arg0: Java.java.time.Clock): Java.java.time.OffsetTime;
                // static
                of(arg0: Java.java.time.LocalTime, arg1: Java.java.time.ZoneOffset): Java.java.time.OffsetTime;
                // static
                of(arg0: number, arg1: number, arg2: number, arg3: number, arg4: Java.java.time.ZoneOffset): Java.java.time.OffsetTime;
                // static
                ofInstant(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.OffsetTime;
                // static
                from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.OffsetTime;
                // static
                parse(arg0: Java.CharSequence): Java.java.time.OffsetTime;
                // static
                parse(arg0: Java.CharSequence, arg1: Java.java.time.format.DateTimeFormatter): Java.java.time.OffsetTime;
                isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                get(arg0: Java.java.time.temporal.TemporalField): number;
                getLong(arg0: Java.java.time.temporal.TemporalField): number;
                getOffset(): Java.java.time.ZoneOffset;
                withOffsetSameLocal(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetTime;
                withOffsetSameInstant(arg0: Java.java.time.ZoneOffset): Java.java.time.OffsetTime;
                toLocalTime(): Java.java.time.LocalTime;
                getHour(): number;
                getMinute(): number;
                getSecond(): number;
                getNano(): number;
                with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.OffsetTime;
                with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.OffsetTime;
                withHour(arg0: number): Java.java.time.OffsetTime;
                withMinute(arg0: number): Java.java.time.OffsetTime;
                withSecond(arg0: number): Java.java.time.OffsetTime;
                withNano(arg0: number): Java.java.time.OffsetTime;
                truncatedTo(arg0: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetTime;
                plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.OffsetTime;
                plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetTime;
                plusHours(arg0: number): Java.java.time.OffsetTime;
                plusMinutes(arg0: number): Java.java.time.OffsetTime;
                plusSeconds(arg0: number): Java.java.time.OffsetTime;
                plusNanos(arg0: number): Java.java.time.OffsetTime;
                minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.OffsetTime;
                minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.OffsetTime;
                minusHours(arg0: number): Java.java.time.OffsetTime;
                minusMinutes(arg0: number): Java.java.time.OffsetTime;
                minusSeconds(arg0: number): Java.java.time.OffsetTime;
                minusNanos(arg0: number): Java.java.time.OffsetTime;
                query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                format(arg0: Java.java.time.format.DateTimeFormatter): string;
                atDate(arg0: Java.java.time.LocalDate): Java.java.time.OffsetDateTime;
                toEpochSecond(arg0: Java.java.time.LocalDate): number;
                compareTo(arg0: Java.java.time.OffsetTime): number;
                isAfter(arg0: Java.java.time.OffsetTime): boolean;
                isBefore(arg0: Java.java.time.OffsetTime): boolean;
                isEqual(arg0: Java.java.time.OffsetTime): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
        
            export namespace temporal {
            
                export interface TemporalAmount extends Java.Interface {
                    
                
                    get(arg0: Java.java.time.temporal.TemporalUnit): number;
                    getUnits(): Java.java.util.List<Java.java.time.temporal.TemporalUnit>;
                    addTo(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    subtractFrom(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    
                }
                export interface TemporalUnit extends Java.Interface {
                    
                
                    getDuration(): Java.java.time.Duration;
                    isDurationEstimated(): boolean;
                    isDateBased(): boolean;
                    isTimeBased(): boolean;
                    isSupportedBy(arg0: Java.java.time.temporal.Temporal): boolean;
                    addTo<R>(arg0: R, arg1: number): R;
                    between(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.Temporal): number;
                    toString(): string;
                    
                }
                export interface TemporalAccessor extends Java.Interface {
                    
                
                    isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                    range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                    get(arg0: Java.java.time.temporal.TemporalField): number;
                    getLong(arg0: Java.java.time.temporal.TemporalField): number;
                    query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                    
                }
                export interface TemporalAdjuster extends Java.Interface {
                    
                
                    adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    
                }
                export interface TemporalField extends Java.Interface {
                    
                
                    getDisplayName(arg0: Java.java.util.Locale): string;
                    getBaseUnit(): Java.java.time.temporal.TemporalUnit;
                    getRangeUnit(): Java.java.time.temporal.TemporalUnit;
                    range(): Java.java.time.temporal.ValueRange;
                    isDateBased(): boolean;
                    isTimeBased(): boolean;
                    isSupportedBy(arg0: Java.java.time.temporal.TemporalAccessor): boolean;
                    rangeRefinedBy(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.temporal.ValueRange;
                    getFrom(arg0: Java.java.time.temporal.TemporalAccessor): number;
                    adjustInto<R>(arg0: R, arg1: number): R;
                    resolve(arg0: Java.java.util.Map<Java.java.time.temporal.TemporalField, number>, arg1: Java.java.time.temporal.TemporalAccessor, arg2: Java.java.time.format.ResolverStyle): Java.java.time.temporal.TemporalAccessor;
                    toString(): string;
                    
                }
                export interface TemporalQuery<R> extends Java.Interface {
                    
                
                    queryFrom(arg0: Java.java.time.temporal.TemporalAccessor): R;
                    
                }
                export interface ChronoField extends Java.Enum<Java.java.time.temporal.ChronoField>, Java.java.time.temporal.TemporalField {
                    // static
                    readonly NANO_OF_SECOND: Java.java.time.temporal.ChronoField;
                    // static
                    readonly NANO_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MICRO_OF_SECOND: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MICRO_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MILLI_OF_SECOND: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MILLI_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly SECOND_OF_MINUTE: Java.java.time.temporal.ChronoField;
                    // static
                    readonly SECOND_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MINUTE_OF_HOUR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MINUTE_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly HOUR_OF_AMPM: Java.java.time.temporal.ChronoField;
                    // static
                    readonly CLOCK_HOUR_OF_AMPM: Java.java.time.temporal.ChronoField;
                    // static
                    readonly HOUR_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly CLOCK_HOUR_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly AMPM_OF_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly DAY_OF_WEEK: Java.java.time.temporal.ChronoField;
                    // static
                    readonly ALIGNED_DAY_OF_WEEK_IN_MONTH: Java.java.time.temporal.ChronoField;
                    // static
                    readonly ALIGNED_DAY_OF_WEEK_IN_YEAR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly DAY_OF_MONTH: Java.java.time.temporal.ChronoField;
                    // static
                    readonly DAY_OF_YEAR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly EPOCH_DAY: Java.java.time.temporal.ChronoField;
                    // static
                    readonly ALIGNED_WEEK_OF_MONTH: Java.java.time.temporal.ChronoField;
                    // static
                    readonly ALIGNED_WEEK_OF_YEAR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly MONTH_OF_YEAR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly PROLEPTIC_MONTH: Java.java.time.temporal.ChronoField;
                    // static
                    readonly YEAR_OF_ERA: Java.java.time.temporal.ChronoField;
                    // static
                    readonly YEAR: Java.java.time.temporal.ChronoField;
                    // static
                    readonly ERA: Java.java.time.temporal.ChronoField;
                    // static
                    readonly INSTANT_SECONDS: Java.java.time.temporal.ChronoField;
                    // static
                    readonly OFFSET_SECONDS: Java.java.time.temporal.ChronoField;
                    
                
                    // static
                    values(): Java.java.time.temporal.ChronoField[];
                    // static
                    valueOf(arg0: string): Java.java.time.temporal.ChronoField;
                    getDisplayName(arg0: Java.java.util.Locale): string;
                    getBaseUnit(): Java.java.time.temporal.TemporalUnit;
                    getRangeUnit(): Java.java.time.temporal.TemporalUnit;
                    range(): Java.java.time.temporal.ValueRange;
                    isDateBased(): boolean;
                    isTimeBased(): boolean;
                    checkValidValue(arg0: number): number;
                    checkValidIntValue(arg0: number): number;
                    isSupportedBy(arg0: Java.java.time.temporal.TemporalAccessor): boolean;
                    rangeRefinedBy(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.temporal.ValueRange;
                    getFrom(arg0: Java.java.time.temporal.TemporalAccessor): number;
                    adjustInto<R>(arg0: R, arg1: number): R;
                    toString(): string;
                    
                }
                export interface Temporal extends Java.Interface, Java.java.time.temporal.TemporalAccessor {
                    
                
                    isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                    with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.temporal.Temporal;
                    with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.temporal.Temporal;
                    plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.temporal.Temporal;
                    plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.temporal.Temporal;
                    minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.temporal.Temporal;
                    minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.temporal.Temporal;
                    until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                    
                }
                export interface ValueRange extends Java.Object, Java.java.io.Serializable {
                    
                
                    // static
                    of(arg0: number, arg1: number): Java.java.time.temporal.ValueRange;
                    // static
                    of(arg0: number, arg1: number, arg2: number): Java.java.time.temporal.ValueRange;
                    // static
                    of(arg0: number, arg1: number, arg2: number, arg3: number): Java.java.time.temporal.ValueRange;
                    isFixed(): boolean;
                    getMinimum(): number;
                    getLargestMinimum(): number;
                    getSmallestMaximum(): number;
                    getMaximum(): number;
                    isIntValue(): boolean;
                    isValidValue(arg0: number): boolean;
                    isValidIntValue(arg0: number): boolean;
                    checkValidValue(arg0: number, arg1: Java.java.time.temporal.TemporalField): number;
                    checkValidIntValue(arg0: number, arg1: Java.java.time.temporal.TemporalField): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ChronoUnit extends Java.Enum<Java.java.time.temporal.ChronoUnit>, Java.java.time.temporal.TemporalUnit {
                    // static
                    readonly NANOS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly MICROS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly MILLIS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly SECONDS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly MINUTES: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly HOURS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly HALF_DAYS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly DAYS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly WEEKS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly MONTHS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly YEARS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly DECADES: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly CENTURIES: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly MILLENNIA: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly ERAS: Java.java.time.temporal.ChronoUnit;
                    // static
                    readonly FOREVER: Java.java.time.temporal.ChronoUnit;
                    
                
                    // static
                    values(): Java.java.time.temporal.ChronoUnit[];
                    // static
                    valueOf(arg0: string): Java.java.time.temporal.ChronoUnit;
                    getDuration(): Java.java.time.Duration;
                    isDurationEstimated(): boolean;
                    isDateBased(): boolean;
                    isTimeBased(): boolean;
                    isSupportedBy(arg0: Java.java.time.temporal.Temporal): boolean;
                    addTo<R>(arg0: R, arg1: number): R;
                    between(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.Temporal): number;
                    toString(): string;
                    
                }
            }
        
            export namespace format {
            
                export interface ResolverStyle extends Java.Enum<Java.java.time.format.ResolverStyle> {
                    // static
                    readonly STRICT: Java.java.time.format.ResolverStyle;
                    // static
                    readonly SMART: Java.java.time.format.ResolverStyle;
                    // static
                    readonly LENIENT: Java.java.time.format.ResolverStyle;
                    
                
                    // static
                    values(): Java.java.time.format.ResolverStyle[];
                    // static
                    valueOf(arg0: string): Java.java.time.format.ResolverStyle;
                    
                }
                export interface TextStyle extends Java.Enum<Java.java.time.format.TextStyle> {
                    // static
                    readonly FULL: Java.java.time.format.TextStyle;
                    // static
                    readonly FULL_STANDALONE: Java.java.time.format.TextStyle;
                    // static
                    readonly SHORT: Java.java.time.format.TextStyle;
                    // static
                    readonly SHORT_STANDALONE: Java.java.time.format.TextStyle;
                    // static
                    readonly NARROW: Java.java.time.format.TextStyle;
                    // static
                    readonly NARROW_STANDALONE: Java.java.time.format.TextStyle;
                    
                
                    // static
                    values(): Java.java.time.format.TextStyle[];
                    // static
                    valueOf(arg0: string): Java.java.time.format.TextStyle;
                    isStandalone(): boolean;
                    asStandalone(): Java.java.time.format.TextStyle;
                    asNormal(): Java.java.time.format.TextStyle;
                    
                }
                export interface DateTimeFormatter extends Java.Object {
                    // static
                    readonly ISO_LOCAL_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_OFFSET_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_LOCAL_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_OFFSET_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_LOCAL_DATE_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_OFFSET_DATE_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_ZONED_DATE_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_DATE_TIME: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_ORDINAL_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_WEEK_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly ISO_INSTANT: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly BASIC_ISO_DATE: Java.java.time.format.DateTimeFormatter;
                    // static
                    readonly RFC_1123_DATE_TIME: Java.java.time.format.DateTimeFormatter;
                    
                
                    // static
                    ofPattern(arg0: string): Java.java.time.format.DateTimeFormatter;
                    // static
                    ofPattern(arg0: string, arg1: Java.java.util.Locale): Java.java.time.format.DateTimeFormatter;
                    // static
                    ofLocalizedDate(arg0: Java.java.time.format.FormatStyle): Java.java.time.format.DateTimeFormatter;
                    // static
                    ofLocalizedTime(arg0: Java.java.time.format.FormatStyle): Java.java.time.format.DateTimeFormatter;
                    // static
                    ofLocalizedDateTime(arg0: Java.java.time.format.FormatStyle): Java.java.time.format.DateTimeFormatter;
                    // static
                    ofLocalizedDateTime(arg0: Java.java.time.format.FormatStyle, arg1: Java.java.time.format.FormatStyle): Java.java.time.format.DateTimeFormatter;
                    // static
                    parsedExcessDays(): Java.java.time.temporal.TemporalQuery<Java.java.time.Period>;
                    // static
                    parsedLeapSecond(): Java.java.time.temporal.TemporalQuery<boolean>;
                    getLocale(): Java.java.util.Locale;
                    withLocale(arg0: Java.java.util.Locale): Java.java.time.format.DateTimeFormatter;
                    localizedBy(arg0: Java.java.util.Locale): Java.java.time.format.DateTimeFormatter;
                    getDecimalStyle(): Java.java.time.format.DecimalStyle;
                    withDecimalStyle(arg0: Java.java.time.format.DecimalStyle): Java.java.time.format.DateTimeFormatter;
                    getChronology(): Java.java.time.chrono.Chronology;
                    withChronology(arg0: Java.java.time.chrono.Chronology): Java.java.time.format.DateTimeFormatter;
                    getZone(): Java.java.time.ZoneId;
                    withZone(arg0: Java.java.time.ZoneId): Java.java.time.format.DateTimeFormatter;
                    getResolverStyle(): Java.java.time.format.ResolverStyle;
                    withResolverStyle(arg0: Java.java.time.format.ResolverStyle): Java.java.time.format.DateTimeFormatter;
                    getResolverFields(): Java.java.util.Set<Java.java.time.temporal.TemporalField>;
                    withResolverFields(arg0: Java.java.time.temporal.TemporalField[]): Java.java.time.format.DateTimeFormatter;
                    withResolverFields(arg0: Java.java.util.Set<Java.java.time.temporal.TemporalField>): Java.java.time.format.DateTimeFormatter;
                    format(arg0: Java.java.time.temporal.TemporalAccessor): string;
                    formatTo(arg0: Java.java.time.temporal.TemporalAccessor, arg1: Java.Appendable): void;
                    parse(arg0: Java.CharSequence): Java.java.time.temporal.TemporalAccessor;
                    parse(arg0: Java.CharSequence, arg1: Java.java.text.ParsePosition): Java.java.time.temporal.TemporalAccessor;
                    parse<T>(arg0: Java.CharSequence, arg1: Java.java.time.temporal.TemporalQuery<T>): T;
                    parseBest(arg0: Java.CharSequence, arg1: Java.java.time.temporal.TemporalQuery<any>[]): Java.java.time.temporal.TemporalAccessor;
                    parseUnresolved(arg0: Java.CharSequence, arg1: Java.java.text.ParsePosition): Java.java.time.temporal.TemporalAccessor;
                    toFormat(): Java.java.text.Format;
                    toFormat(arg0: Java.java.time.temporal.TemporalQuery<any>): Java.java.text.Format;
                    toString(): string;
                    
                }
                export interface DecimalStyle extends Java.Object {
                    // static
                    readonly STANDARD: Java.java.time.format.DecimalStyle;
                    
                
                    // static
                    getAvailableLocales(): Java.java.util.Set<Java.java.util.Locale>;
                    // static
                    ofDefaultLocale(): Java.java.time.format.DecimalStyle;
                    // static
                    of(arg0: Java.java.util.Locale): Java.java.time.format.DecimalStyle;
                    getZeroDigit(): number;
                    withZeroDigit(arg0: number): Java.java.time.format.DecimalStyle;
                    getPositiveSign(): number;
                    withPositiveSign(arg0: number): Java.java.time.format.DecimalStyle;
                    getNegativeSign(): number;
                    withNegativeSign(arg0: number): Java.java.time.format.DecimalStyle;
                    getDecimalSeparator(): number;
                    withDecimalSeparator(arg0: number): Java.java.time.format.DecimalStyle;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface FormatStyle extends Java.Enum<Java.java.time.format.FormatStyle> {
                    // static
                    readonly FULL: Java.java.time.format.FormatStyle;
                    // static
                    readonly LONG: Java.java.time.format.FormatStyle;
                    // static
                    readonly MEDIUM: Java.java.time.format.FormatStyle;
                    // static
                    readonly SHORT: Java.java.time.format.FormatStyle;
                    
                
                    // static
                    values(): Java.java.time.format.FormatStyle[];
                    // static
                    valueOf(arg0: string): Java.java.time.format.FormatStyle;
                    
                }
            }
        
            export namespace chrono {
            
                export interface IsoEra extends Java.Enum<Java.java.time.chrono.IsoEra>, Java.java.time.chrono.Era {
                    // static
                    readonly BCE: Java.java.time.chrono.IsoEra;
                    // static
                    readonly CE: Java.java.time.chrono.IsoEra;
                    
                
                    // static
                    values(): Java.java.time.chrono.IsoEra[];
                    // static
                    valueOf(arg0: string): Java.java.time.chrono.IsoEra;
                    // static
                    of(arg0: number): Java.java.time.chrono.IsoEra;
                    getValue(): number;
                    
                }
                export interface ChronoLocalDate extends Java.Interface, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.chrono.ChronoLocalDate> {
                    
                
                    // static
                    timeLineOrder(): Java.java.util.Comparator<Java.java.time.chrono.ChronoLocalDate>;
                    // static
                    from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoLocalDate;
                    getChronology(): Java.java.time.chrono.Chronology;
                    getEra(): Java.java.time.chrono.Era;
                    isLeapYear(): boolean;
                    lengthOfMonth(): number;
                    lengthOfYear(): number;
                    isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                    isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                    with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.chrono.ChronoLocalDate;
                    with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.chrono.ChronoLocalDate;
                    plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoLocalDate;
                    plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoLocalDate;
                    minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoLocalDate;
                    minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoLocalDate;
                    query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                    adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    until(arg0: Java.java.time.temporal.Temporal, arg1: Java.java.time.temporal.TemporalUnit): number;
                    until(arg0: Java.java.time.chrono.ChronoLocalDate): Java.java.time.chrono.ChronoPeriod;
                    format(arg0: Java.java.time.format.DateTimeFormatter): string;
                    atTime(arg0: Java.java.time.LocalTime): Java.java.time.chrono.ChronoLocalDateTime<any>;
                    toEpochDay(): number;
                    compareTo(arg0: Java.java.time.chrono.ChronoLocalDate): number;
                    isAfter(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                    isBefore(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                    isEqual(arg0: Java.java.time.chrono.ChronoLocalDate): boolean;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface IsoChronology extends Java.java.time.chrono.AbstractChronology, Java.java.io.Serializable {
                    // static
                    readonly INSTANCE: Java.java.time.chrono.IsoChronology;
                    
                
                    getId(): string;
                    getCalendarType(): string;
                    date(arg0: Java.java.time.chrono.Era, arg1: number, arg2: number, arg3: number): Java.java.time.LocalDate;
                    date(arg0: number, arg1: number, arg2: number): Java.java.time.LocalDate;
                    dateYearDay(arg0: Java.java.time.chrono.Era, arg1: number, arg2: number): Java.java.time.LocalDate;
                    dateYearDay(arg0: number, arg1: number): Java.java.time.LocalDate;
                    dateEpochDay(arg0: number): Java.java.time.LocalDate;
                    date(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.LocalDate;
                    epochSecond(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: Java.java.time.ZoneOffset): number;
                    localDateTime(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.LocalDateTime;
                    zonedDateTime(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.ZonedDateTime;
                    zonedDateTime(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.ZonedDateTime;
                    dateNow(): Java.java.time.LocalDate;
                    dateNow(arg0: Java.java.time.ZoneId): Java.java.time.LocalDate;
                    dateNow(arg0: Java.java.time.Clock): Java.java.time.LocalDate;
                    isLeapYear(arg0: number): boolean;
                    prolepticYear(arg0: Java.java.time.chrono.Era, arg1: number): number;
                    eraOf(arg0: number): Java.java.time.chrono.IsoEra;
                    eras(): Java.java.util.List<Java.java.time.chrono.Era>;
                    resolveDate(arg0: Java.java.util.Map<Java.java.time.temporal.TemporalField, number>, arg1: Java.java.time.format.ResolverStyle): Java.java.time.LocalDate;
                    range(arg0: Java.java.time.temporal.ChronoField): Java.java.time.temporal.ValueRange;
                    period(arg0: number, arg1: number, arg2: number): Java.java.time.Period;
                    
                }
                export interface ChronoPeriod extends Java.Interface, Java.java.time.temporal.TemporalAmount {
                    
                
                    // static
                    between(arg0: Java.java.time.chrono.ChronoLocalDate, arg1: Java.java.time.chrono.ChronoLocalDate): Java.java.time.chrono.ChronoPeriod;
                    get(arg0: Java.java.time.temporal.TemporalUnit): number;
                    getUnits(): Java.java.util.List<Java.java.time.temporal.TemporalUnit>;
                    getChronology(): Java.java.time.chrono.Chronology;
                    isZero(): boolean;
                    isNegative(): boolean;
                    plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoPeriod;
                    minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoPeriod;
                    multipliedBy(arg0: number): Java.java.time.chrono.ChronoPeriod;
                    negated(): Java.java.time.chrono.ChronoPeriod;
                    normalized(): Java.java.time.chrono.ChronoPeriod;
                    addTo(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    subtractFrom(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ChronoLocalDateTime<D> extends Java.Interface, Java.java.time.temporal.Temporal, Java.java.time.temporal.TemporalAdjuster, Java.Comparable<Java.java.time.chrono.ChronoLocalDateTime<any>> {
                    
                
                    // static
                    timeLineOrder(): Java.java.util.Comparator<Java.java.time.chrono.ChronoLocalDateTime<any>>;
                    // static
                    from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoLocalDateTime<any>;
                    getChronology(): Java.java.time.chrono.Chronology;
                    toLocalDate(): D;
                    toLocalTime(): Java.java.time.LocalTime;
                    isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                    isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                    with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                    adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    format(arg0: Java.java.time.format.DateTimeFormatter): string;
                    atZone(arg0: Java.java.time.ZoneId): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    toInstant(arg0: Java.java.time.ZoneOffset): Java.java.time.Instant;
                    toEpochSecond(arg0: Java.java.time.ZoneOffset): number;
                    compareTo(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): number;
                    isAfter(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                    isBefore(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                    isEqual(arg0: Java.java.time.chrono.ChronoLocalDateTime<any>): boolean;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface AbstractChronology extends Java.Object, Java.java.time.chrono.Chronology {
                    
                
                    resolveDate(arg0: Java.java.util.Map<Java.java.time.temporal.TemporalField, number>, arg1: Java.java.time.format.ResolverStyle): Java.java.time.chrono.ChronoLocalDate;
                    compareTo(arg0: Java.java.time.chrono.Chronology): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface Era extends Java.Interface, Java.java.time.temporal.TemporalAccessor, Java.java.time.temporal.TemporalAdjuster {
                    
                
                    getValue(): number;
                    isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                    range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                    get(arg0: Java.java.time.temporal.TemporalField): number;
                    getLong(arg0: Java.java.time.temporal.TemporalField): number;
                    query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                    adjustInto(arg0: Java.java.time.temporal.Temporal): Java.java.time.temporal.Temporal;
                    getDisplayName(arg0: Java.java.time.format.TextStyle, arg1: Java.java.util.Locale): string;
                    
                }
                export interface Chronology extends Java.Interface, Java.Comparable<Java.java.time.chrono.Chronology> {
                    
                
                    // static
                    from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.Chronology;
                    // static
                    ofLocale(arg0: Java.java.util.Locale): Java.java.time.chrono.Chronology;
                    // static
                    of(arg0: string): Java.java.time.chrono.Chronology;
                    // static
                    getAvailableChronologies(): Java.java.util.Set<Java.java.time.chrono.Chronology>;
                    getId(): string;
                    getCalendarType(): string;
                    date(arg0: Java.java.time.chrono.Era, arg1: number, arg2: number, arg3: number): Java.java.time.chrono.ChronoLocalDate;
                    date(arg0: number, arg1: number, arg2: number): Java.java.time.chrono.ChronoLocalDate;
                    dateYearDay(arg0: Java.java.time.chrono.Era, arg1: number, arg2: number): Java.java.time.chrono.ChronoLocalDate;
                    dateYearDay(arg0: number, arg1: number): Java.java.time.chrono.ChronoLocalDate;
                    dateEpochDay(arg0: number): Java.java.time.chrono.ChronoLocalDate;
                    dateNow(): Java.java.time.chrono.ChronoLocalDate;
                    dateNow(arg0: Java.java.time.ZoneId): Java.java.time.chrono.ChronoLocalDate;
                    dateNow(arg0: Java.java.time.Clock): Java.java.time.chrono.ChronoLocalDate;
                    date(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoLocalDate;
                    localDateTime(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoLocalDateTime<any>;
                    zonedDateTime(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoZonedDateTime<any>;
                    zonedDateTime(arg0: Java.java.time.Instant, arg1: Java.java.time.ZoneId): Java.java.time.chrono.ChronoZonedDateTime<any>;
                    isLeapYear(arg0: number): boolean;
                    prolepticYear(arg0: Java.java.time.chrono.Era, arg1: number): number;
                    eraOf(arg0: number): Java.java.time.chrono.Era;
                    eras(): Java.java.util.List<Java.java.time.chrono.Era>;
                    range(arg0: Java.java.time.temporal.ChronoField): Java.java.time.temporal.ValueRange;
                    getDisplayName(arg0: Java.java.time.format.TextStyle, arg1: Java.java.util.Locale): string;
                    resolveDate(arg0: Java.java.util.Map<Java.java.time.temporal.TemporalField, number>, arg1: Java.java.time.format.ResolverStyle): Java.java.time.chrono.ChronoLocalDate;
                    period(arg0: number, arg1: number, arg2: number): Java.java.time.chrono.ChronoPeriod;
                    epochSecond(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: Java.java.time.ZoneOffset): number;
                    epochSecond(arg0: Java.java.time.chrono.Era, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: Java.java.time.ZoneOffset): number;
                    compareTo(arg0: Java.java.time.chrono.Chronology): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ChronoZonedDateTime<D> extends Java.Interface, Java.java.time.temporal.Temporal, Java.Comparable<Java.java.time.chrono.ChronoZonedDateTime<any>> {
                    
                
                    // static
                    timeLineOrder(): Java.java.util.Comparator<Java.java.time.chrono.ChronoZonedDateTime<any>>;
                    // static
                    from(arg0: Java.java.time.temporal.TemporalAccessor): Java.java.time.chrono.ChronoZonedDateTime<any>;
                    range(arg0: Java.java.time.temporal.TemporalField): Java.java.time.temporal.ValueRange;
                    get(arg0: Java.java.time.temporal.TemporalField): number;
                    getLong(arg0: Java.java.time.temporal.TemporalField): number;
                    toLocalDate(): D;
                    toLocalTime(): Java.java.time.LocalTime;
                    toLocalDateTime(): Java.java.time.chrono.ChronoLocalDateTime<D>;
                    getChronology(): Java.java.time.chrono.Chronology;
                    getOffset(): Java.java.time.ZoneOffset;
                    getZone(): Java.java.time.ZoneId;
                    withEarlierOffsetAtOverlap(): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    withLaterOffsetAtOverlap(): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    withZoneSameLocal(arg0: Java.java.time.ZoneId): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    withZoneSameInstant(arg0: Java.java.time.ZoneId): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    isSupported(arg0: Java.java.time.temporal.TemporalField): boolean;
                    isSupported(arg0: Java.java.time.temporal.TemporalUnit): boolean;
                    with(arg0: Java.java.time.temporal.TemporalAdjuster): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    with(arg0: Java.java.time.temporal.TemporalField, arg1: number): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    plus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    plus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    minus(arg0: Java.java.time.temporal.TemporalAmount): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    minus(arg0: number, arg1: Java.java.time.temporal.TemporalUnit): Java.java.time.chrono.ChronoZonedDateTime<D>;
                    query<R>(arg0: Java.java.time.temporal.TemporalQuery<R>): R;
                    format(arg0: Java.java.time.format.DateTimeFormatter): string;
                    toInstant(): Java.java.time.Instant;
                    toEpochSecond(): number;
                    compareTo(arg0: Java.java.time.chrono.ChronoZonedDateTime<any>): number;
                    isBefore(arg0: Java.java.time.chrono.ChronoZonedDateTime<any>): boolean;
                    isAfter(arg0: Java.java.time.chrono.ChronoZonedDateTime<any>): boolean;
                    isEqual(arg0: Java.java.time.chrono.ChronoZonedDateTime<any>): boolean;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
            }
        
            export namespace zone {
            
                export interface ZoneRules extends Java.Object, Java.java.io.Serializable {
                    
                
                    // static
                    of(arg0: Java.java.time.ZoneOffset, arg1: Java.java.time.ZoneOffset, arg2: Java.java.util.List<Java.java.time.zone.ZoneOffsetTransition>, arg3: Java.java.util.List<Java.java.time.zone.ZoneOffsetTransition>, arg4: Java.java.util.List<Java.java.time.zone.ZoneOffsetTransitionRule>): Java.java.time.zone.ZoneRules;
                    // static
                    of(arg0: Java.java.time.ZoneOffset): Java.java.time.zone.ZoneRules;
                    isFixedOffset(): boolean;
                    getOffset(arg0: Java.java.time.Instant): Java.java.time.ZoneOffset;
                    getOffset(arg0: Java.java.time.LocalDateTime): Java.java.time.ZoneOffset;
                    getValidOffsets(arg0: Java.java.time.LocalDateTime): Java.java.util.List<Java.java.time.ZoneOffset>;
                    getTransition(arg0: Java.java.time.LocalDateTime): Java.java.time.zone.ZoneOffsetTransition;
                    getStandardOffset(arg0: Java.java.time.Instant): Java.java.time.ZoneOffset;
                    getDaylightSavings(arg0: Java.java.time.Instant): Java.java.time.Duration;
                    isDaylightSavings(arg0: Java.java.time.Instant): boolean;
                    isValidOffset(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset): boolean;
                    nextTransition(arg0: Java.java.time.Instant): Java.java.time.zone.ZoneOffsetTransition;
                    previousTransition(arg0: Java.java.time.Instant): Java.java.time.zone.ZoneOffsetTransition;
                    getTransitions(): Java.java.util.List<Java.java.time.zone.ZoneOffsetTransition>;
                    getTransitionRules(): Java.java.util.List<Java.java.time.zone.ZoneOffsetTransitionRule>;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ZoneOffsetTransition extends Java.Object, Java.Comparable<Java.java.time.zone.ZoneOffsetTransition>, Java.java.io.Serializable {
                    
                
                    // static
                    of(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset, arg2: Java.java.time.ZoneOffset): Java.java.time.zone.ZoneOffsetTransition;
                    getInstant(): Java.java.time.Instant;
                    toEpochSecond(): number;
                    getDateTimeBefore(): Java.java.time.LocalDateTime;
                    getDateTimeAfter(): Java.java.time.LocalDateTime;
                    getOffsetBefore(): Java.java.time.ZoneOffset;
                    getOffsetAfter(): Java.java.time.ZoneOffset;
                    getDuration(): Java.java.time.Duration;
                    isGap(): boolean;
                    isOverlap(): boolean;
                    isValidOffset(arg0: Java.java.time.ZoneOffset): boolean;
                    compareTo(arg0: Java.java.time.zone.ZoneOffsetTransition): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ZoneOffsetTransitionRule extends Java.Object, Java.java.io.Serializable {
                    
                
                    // static
                    of(arg0: Java.java.time.Month, arg1: number, arg2: Java.java.time.DayOfWeek, arg3: Java.java.time.LocalTime, arg4: boolean, arg5: Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition, arg6: Java.java.time.ZoneOffset, arg7: Java.java.time.ZoneOffset, arg8: Java.java.time.ZoneOffset): Java.java.time.zone.ZoneOffsetTransitionRule;
                    getMonth(): Java.java.time.Month;
                    getDayOfMonthIndicator(): number;
                    getDayOfWeek(): Java.java.time.DayOfWeek;
                    getLocalTime(): Java.java.time.LocalTime;
                    isMidnightEndOfDay(): boolean;
                    getTimeDefinition(): Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition;
                    getStandardOffset(): Java.java.time.ZoneOffset;
                    getOffsetBefore(): Java.java.time.ZoneOffset;
                    getOffsetAfter(): Java.java.time.ZoneOffset;
                    createTransition(arg0: number): Java.java.time.zone.ZoneOffsetTransition;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface ZoneOffsetTransitionRule$TimeDefinition extends Java.Enum<Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition> {
                    // static
                    readonly UTC: Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition;
                    // static
                    readonly WALL: Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition;
                    // static
                    readonly STANDARD: Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition;
                    
                
                    // static
                    values(): Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition[];
                    // static
                    valueOf(arg0: string): Java.java.time.zone.ZoneOffsetTransitionRule$TimeDefinition;
                    createDateTime(arg0: Java.java.time.LocalDateTime, arg1: Java.java.time.ZoneOffset, arg2: Java.java.time.ZoneOffset): Java.java.time.LocalDateTime;
                    
                }
            }
        }
    
        export namespace io {
        
            export interface InputStream extends Java.Object, Java.java.io.Closeable {
                
            
                // static
                nullInputStream(): Java.java.io.InputStream;
                read(): number;
                read(arg0: number[]): number;
                read(arg0: number[], arg1: number, arg2: number): number;
                readAllBytes(): number[];
                readNBytes(arg0: number): number[];
                readNBytes(arg0: number[], arg1: number, arg2: number): number;
                skip(arg0: number): number;
                skipNBytes(arg0: number): void;
                available(): number;
                close(): void;
                mark(arg0: number): void;
                reset(): void;
                markSupported(): boolean;
                transferTo(arg0: Java.java.io.OutputStream): number;
                
            }
            export interface OutputStream extends Java.Object, Java.java.io.Closeable, Java.java.io.Flushable {
                
            
                // static
                nullOutputStream(): Java.java.io.OutputStream;
                write(arg0: number): void;
                write(arg0: number[]): void;
                write(arg0: number[], arg1: number, arg2: number): void;
                flush(): void;
                close(): void;
                
            }
            export interface Reader extends Java.Object, Java.Readable, Java.java.io.Closeable {
                
            
                // static
                nullReader(): Java.java.io.Reader;
                read(arg0: Java.java.nio.CharBuffer): number;
                read(): number;
                read(arg0: number[]): number;
                read(arg0: number[], arg1: number, arg2: number): number;
                skip(arg0: number): number;
                ready(): boolean;
                markSupported(): boolean;
                mark(arg0: number): void;
                reset(): void;
                close(): void;
                transferTo(arg0: Java.java.io.Writer): number;
                
            }
            export interface Closeable extends Java.Interface, Java.AutoCloseable {
                
            
                close(): void;
                
            }
            export interface Writer extends Java.Object, Java.Appendable, Java.java.io.Closeable, Java.java.io.Flushable {
                
            
                // static
                nullWriter(): Java.java.io.Writer;
                write(arg0: number): void;
                write(arg0: number[]): void;
                write(arg0: number[], arg1: number, arg2: number): void;
                write(arg0: string): void;
                write(arg0: string, arg1: number, arg2: number): void;
                append(arg0: Java.CharSequence): Java.java.io.Writer;
                append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.java.io.Writer;
                append(arg0: number): Java.java.io.Writer;
                flush(): void;
                close(): void;
                
            }
            export interface Flushable extends Java.Interface {
                
            
                flush(): void;
                
            }
            export interface PrintWriter extends Java.java.io.Writer {
                
            
                flush(): void;
                close(): void;
                checkError(): boolean;
                write(arg0: number): void;
                write(arg0: number[], arg1: number, arg2: number): void;
                write(arg0: number[]): void;
                write(arg0: string, arg1: number, arg2: number): void;
                write(arg0: string): void;
                print(arg0: boolean): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number[]): void;
                print(arg0: string): void;
                print(arg0: Java.Object): void;
                println(): void;
                println(arg0: boolean): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number[]): void;
                println(arg0: string): void;
                println(arg0: Java.Object): void;
                printf(arg0: string, arg1: Java.Object[]): Java.java.io.PrintWriter;
                printf(arg0: Java.java.util.Locale, arg1: string, arg2: Java.Object[]): Java.java.io.PrintWriter;
                format(arg0: string, arg1: Java.Object[]): Java.java.io.PrintWriter;
                format(arg0: Java.java.util.Locale, arg1: string, arg2: Java.Object[]): Java.java.io.PrintWriter;
                append(arg0: Java.CharSequence): Java.java.io.PrintWriter;
                append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.java.io.PrintWriter;
                append(arg0: number): Java.java.io.PrintWriter;
                
            }
            export interface PrintStream extends Java.java.io.FilterOutputStream, Java.Appendable, Java.java.io.Closeable {
                
            
                flush(): void;
                close(): void;
                checkError(): boolean;
                write(arg0: number): void;
                write(arg0: number[], arg1: number, arg2: number): void;
                write(arg0: number[]): void;
                writeBytes(arg0: number[]): void;
                print(arg0: boolean): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number): void;
                print(arg0: number[]): void;
                print(arg0: string): void;
                print(arg0: Java.Object): void;
                println(): void;
                println(arg0: boolean): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number): void;
                println(arg0: number[]): void;
                println(arg0: string): void;
                println(arg0: Java.Object): void;
                printf(arg0: string, arg1: Java.Object[]): Java.java.io.PrintStream;
                printf(arg0: Java.java.util.Locale, arg1: string, arg2: Java.Object[]): Java.java.io.PrintStream;
                format(arg0: string, arg1: Java.Object[]): Java.java.io.PrintStream;
                format(arg0: Java.java.util.Locale, arg1: string, arg2: Java.Object[]): Java.java.io.PrintStream;
                append(arg0: Java.CharSequence): Java.java.io.PrintStream;
                append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.java.io.PrintStream;
                append(arg0: number): Java.java.io.PrintStream;
                
            }
            export interface FilterOutputStream extends Java.java.io.OutputStream {
                
            
                write(arg0: number): void;
                write(arg0: number[]): void;
                write(arg0: number[], arg1: number, arg2: number): void;
                flush(): void;
                close(): void;
                
            }
        }
    
        export namespace nio {
        
            export interface CharBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.CharBuffer>, Java.Appendable, Java.CharSequence, Java.Readable {
                
            
                // static
                allocate(arg0: number): Java.java.nio.CharBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.CharBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.CharBuffer;
                read(arg0: Java.java.nio.CharBuffer): number;
                // static
                wrap(arg0: Java.CharSequence, arg1: number, arg2: number): Java.java.nio.CharBuffer;
                // static
                wrap(arg0: Java.CharSequence): Java.java.nio.CharBuffer;
                slice(): Java.java.nio.CharBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.CharBuffer;
                duplicate(): Java.java.nio.CharBuffer;
                asReadOnlyBuffer(): Java.java.nio.CharBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.CharBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.CharBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.CharBuffer;
                get(arg0: number[]): Java.java.nio.CharBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.CharBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.CharBuffer;
                put(arg0: Java.java.nio.CharBuffer): Java.java.nio.CharBuffer;
                put(arg0: number, arg1: Java.java.nio.CharBuffer, arg2: number, arg3: number): Java.java.nio.CharBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.CharBuffer;
                put(arg0: number[]): Java.java.nio.CharBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.CharBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.CharBuffer;
                put(arg0: string, arg1: number, arg2: number): Java.java.nio.CharBuffer;
                put(arg0: string): Java.java.nio.CharBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.CharBuffer;
                limit(arg0: number): Java.java.nio.CharBuffer;
                mark(): Java.java.nio.CharBuffer;
                reset(): Java.java.nio.CharBuffer;
                clear(): Java.java.nio.CharBuffer;
                flip(): Java.java.nio.CharBuffer;
                rewind(): Java.java.nio.CharBuffer;
                compact(): Java.java.nio.CharBuffer;
                isDirect(): boolean;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.CharBuffer): number;
                mismatch(arg0: Java.java.nio.CharBuffer): number;
                toString(): string;
                length(): number;
                isEmpty(): boolean;
                charAt(arg0: number): number;
                subSequence(arg0: number, arg1: number): Java.java.nio.CharBuffer;
                append(arg0: Java.CharSequence): Java.java.nio.CharBuffer;
                append(arg0: Java.CharSequence, arg1: number, arg2: number): Java.java.nio.CharBuffer;
                append(arg0: number): Java.java.nio.CharBuffer;
                order(): Java.java.nio.ByteOrder;
                chars(): Java.java.util.stream.IntStream;
                
            }
            export interface ByteOrder extends Java.Object {
                // static
                readonly BIG_ENDIAN: Java.java.nio.ByteOrder;
                // static
                readonly LITTLE_ENDIAN: Java.java.nio.ByteOrder;
                
            
                // static
                nativeOrder(): Java.java.nio.ByteOrder;
                toString(): string;
                
            }
            export interface ByteBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.ByteBuffer> {
                
            
                // static
                allocateDirect(arg0: number): Java.java.nio.ByteBuffer;
                // static
                allocate(arg0: number): Java.java.nio.ByteBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.ByteBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.ByteBuffer;
                slice(): Java.java.nio.ByteBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                duplicate(): Java.java.nio.ByteBuffer;
                asReadOnlyBuffer(): Java.java.nio.ByteBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.ByteBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.ByteBuffer;
                get(arg0: number[]): Java.java.nio.ByteBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.ByteBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.ByteBuffer;
                put(arg0: Java.java.nio.ByteBuffer): Java.java.nio.ByteBuffer;
                put(arg0: number, arg1: Java.java.nio.ByteBuffer, arg2: number, arg3: number): Java.java.nio.ByteBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.ByteBuffer;
                put(arg0: number[]): Java.java.nio.ByteBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.ByteBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.ByteBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.ByteBuffer;
                limit(arg0: number): Java.java.nio.ByteBuffer;
                mark(): Java.java.nio.ByteBuffer;
                reset(): Java.java.nio.ByteBuffer;
                clear(): Java.java.nio.ByteBuffer;
                flip(): Java.java.nio.ByteBuffer;
                rewind(): Java.java.nio.ByteBuffer;
                compact(): Java.java.nio.ByteBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.ByteBuffer): number;
                mismatch(arg0: Java.java.nio.ByteBuffer): number;
                order(): Java.java.nio.ByteOrder;
                order(arg0: Java.java.nio.ByteOrder): Java.java.nio.ByteBuffer;
                alignmentOffset(arg0: number, arg1: number): number;
                alignedSlice(arg0: number): Java.java.nio.ByteBuffer;
                getChar(): number;
                putChar(arg0: number): Java.java.nio.ByteBuffer;
                getChar(arg0: number): number;
                putChar(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asCharBuffer(): Java.java.nio.CharBuffer;
                getShort(): number;
                putShort(arg0: number): Java.java.nio.ByteBuffer;
                getShort(arg0: number): number;
                putShort(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asShortBuffer(): Java.java.nio.ShortBuffer;
                getInt(): number;
                putInt(arg0: number): Java.java.nio.ByteBuffer;
                getInt(arg0: number): number;
                putInt(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asIntBuffer(): Java.java.nio.IntBuffer;
                getLong(): number;
                putLong(arg0: number): Java.java.nio.ByteBuffer;
                getLong(arg0: number): number;
                putLong(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asLongBuffer(): Java.java.nio.LongBuffer;
                getFloat(): number;
                putFloat(arg0: number): Java.java.nio.ByteBuffer;
                getFloat(arg0: number): number;
                putFloat(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asFloatBuffer(): Java.java.nio.FloatBuffer;
                getDouble(): number;
                putDouble(arg0: number): Java.java.nio.ByteBuffer;
                getDouble(arg0: number): number;
                putDouble(arg0: number, arg1: number): Java.java.nio.ByteBuffer;
                asDoubleBuffer(): Java.java.nio.DoubleBuffer;
                
            }
            export interface Buffer extends Java.Object {
                
            
                capacity(): number;
                position(): number;
                position(arg0: number): Java.java.nio.Buffer;
                limit(): number;
                limit(arg0: number): Java.java.nio.Buffer;
                mark(): Java.java.nio.Buffer;
                reset(): Java.java.nio.Buffer;
                clear(): Java.java.nio.Buffer;
                flip(): Java.java.nio.Buffer;
                rewind(): Java.java.nio.Buffer;
                remaining(): number;
                hasRemaining(): boolean;
                isReadOnly(): boolean;
                hasArray(): boolean;
                array(): Java.Object;
                arrayOffset(): number;
                isDirect(): boolean;
                slice(): Java.java.nio.Buffer;
                slice(arg0: number, arg1: number): Java.java.nio.Buffer;
                duplicate(): Java.java.nio.Buffer;
                
            }
            export interface IntBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.IntBuffer> {
                
            
                // static
                allocate(arg0: number): Java.java.nio.IntBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.IntBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.IntBuffer;
                slice(): Java.java.nio.IntBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.IntBuffer;
                duplicate(): Java.java.nio.IntBuffer;
                asReadOnlyBuffer(): Java.java.nio.IntBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.IntBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.IntBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.IntBuffer;
                get(arg0: number[]): Java.java.nio.IntBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.IntBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.IntBuffer;
                put(arg0: Java.java.nio.IntBuffer): Java.java.nio.IntBuffer;
                put(arg0: number, arg1: Java.java.nio.IntBuffer, arg2: number, arg3: number): Java.java.nio.IntBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.IntBuffer;
                put(arg0: number[]): Java.java.nio.IntBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.IntBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.IntBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.IntBuffer;
                limit(arg0: number): Java.java.nio.IntBuffer;
                mark(): Java.java.nio.IntBuffer;
                reset(): Java.java.nio.IntBuffer;
                clear(): Java.java.nio.IntBuffer;
                flip(): Java.java.nio.IntBuffer;
                rewind(): Java.java.nio.IntBuffer;
                compact(): Java.java.nio.IntBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.IntBuffer): number;
                mismatch(arg0: Java.java.nio.IntBuffer): number;
                order(): Java.java.nio.ByteOrder;
                
            }
            export interface LongBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.LongBuffer> {
                
            
                // static
                allocate(arg0: number): Java.java.nio.LongBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.LongBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.LongBuffer;
                slice(): Java.java.nio.LongBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.LongBuffer;
                duplicate(): Java.java.nio.LongBuffer;
                asReadOnlyBuffer(): Java.java.nio.LongBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.LongBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.LongBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.LongBuffer;
                get(arg0: number[]): Java.java.nio.LongBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.LongBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.LongBuffer;
                put(arg0: Java.java.nio.LongBuffer): Java.java.nio.LongBuffer;
                put(arg0: number, arg1: Java.java.nio.LongBuffer, arg2: number, arg3: number): Java.java.nio.LongBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.LongBuffer;
                put(arg0: number[]): Java.java.nio.LongBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.LongBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.LongBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.LongBuffer;
                limit(arg0: number): Java.java.nio.LongBuffer;
                mark(): Java.java.nio.LongBuffer;
                reset(): Java.java.nio.LongBuffer;
                clear(): Java.java.nio.LongBuffer;
                flip(): Java.java.nio.LongBuffer;
                rewind(): Java.java.nio.LongBuffer;
                compact(): Java.java.nio.LongBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.LongBuffer): number;
                mismatch(arg0: Java.java.nio.LongBuffer): number;
                order(): Java.java.nio.ByteOrder;
                
            }
            export interface DoubleBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.DoubleBuffer> {
                
            
                // static
                allocate(arg0: number): Java.java.nio.DoubleBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.DoubleBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.DoubleBuffer;
                slice(): Java.java.nio.DoubleBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.DoubleBuffer;
                duplicate(): Java.java.nio.DoubleBuffer;
                asReadOnlyBuffer(): Java.java.nio.DoubleBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.DoubleBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.DoubleBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.DoubleBuffer;
                get(arg0: number[]): Java.java.nio.DoubleBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.DoubleBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.DoubleBuffer;
                put(arg0: Java.java.nio.DoubleBuffer): Java.java.nio.DoubleBuffer;
                put(arg0: number, arg1: Java.java.nio.DoubleBuffer, arg2: number, arg3: number): Java.java.nio.DoubleBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.DoubleBuffer;
                put(arg0: number[]): Java.java.nio.DoubleBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.DoubleBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.DoubleBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.DoubleBuffer;
                limit(arg0: number): Java.java.nio.DoubleBuffer;
                mark(): Java.java.nio.DoubleBuffer;
                reset(): Java.java.nio.DoubleBuffer;
                clear(): Java.java.nio.DoubleBuffer;
                flip(): Java.java.nio.DoubleBuffer;
                rewind(): Java.java.nio.DoubleBuffer;
                compact(): Java.java.nio.DoubleBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.DoubleBuffer): number;
                mismatch(arg0: Java.java.nio.DoubleBuffer): number;
                order(): Java.java.nio.ByteOrder;
                
            }
            export interface FloatBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.FloatBuffer> {
                
            
                // static
                allocate(arg0: number): Java.java.nio.FloatBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.FloatBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.FloatBuffer;
                slice(): Java.java.nio.FloatBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.FloatBuffer;
                duplicate(): Java.java.nio.FloatBuffer;
                asReadOnlyBuffer(): Java.java.nio.FloatBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.FloatBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.FloatBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.FloatBuffer;
                get(arg0: number[]): Java.java.nio.FloatBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.FloatBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.FloatBuffer;
                put(arg0: Java.java.nio.FloatBuffer): Java.java.nio.FloatBuffer;
                put(arg0: number, arg1: Java.java.nio.FloatBuffer, arg2: number, arg3: number): Java.java.nio.FloatBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.FloatBuffer;
                put(arg0: number[]): Java.java.nio.FloatBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.FloatBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.FloatBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.FloatBuffer;
                limit(arg0: number): Java.java.nio.FloatBuffer;
                mark(): Java.java.nio.FloatBuffer;
                reset(): Java.java.nio.FloatBuffer;
                clear(): Java.java.nio.FloatBuffer;
                flip(): Java.java.nio.FloatBuffer;
                rewind(): Java.java.nio.FloatBuffer;
                compact(): Java.java.nio.FloatBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.FloatBuffer): number;
                mismatch(arg0: Java.java.nio.FloatBuffer): number;
                order(): Java.java.nio.ByteOrder;
                
            }
            export interface ShortBuffer extends Java.java.nio.Buffer, Java.Comparable<Java.java.nio.ShortBuffer> {
                
            
                // static
                allocate(arg0: number): Java.java.nio.ShortBuffer;
                // static
                wrap(arg0: number[], arg1: number, arg2: number): Java.java.nio.ShortBuffer;
                // static
                wrap(arg0: number[]): Java.java.nio.ShortBuffer;
                slice(): Java.java.nio.ShortBuffer;
                slice(arg0: number, arg1: number): Java.java.nio.ShortBuffer;
                duplicate(): Java.java.nio.ShortBuffer;
                asReadOnlyBuffer(): Java.java.nio.ShortBuffer;
                get(): number;
                put(arg0: number): Java.java.nio.ShortBuffer;
                get(arg0: number): number;
                put(arg0: number, arg1: number): Java.java.nio.ShortBuffer;
                get(arg0: number[], arg1: number, arg2: number): Java.java.nio.ShortBuffer;
                get(arg0: number[]): Java.java.nio.ShortBuffer;
                get(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.ShortBuffer;
                get(arg0: number, arg1: number[]): Java.java.nio.ShortBuffer;
                put(arg0: Java.java.nio.ShortBuffer): Java.java.nio.ShortBuffer;
                put(arg0: number, arg1: Java.java.nio.ShortBuffer, arg2: number, arg3: number): Java.java.nio.ShortBuffer;
                put(arg0: number[], arg1: number, arg2: number): Java.java.nio.ShortBuffer;
                put(arg0: number[]): Java.java.nio.ShortBuffer;
                put(arg0: number, arg1: number[], arg2: number, arg3: number): Java.java.nio.ShortBuffer;
                put(arg0: number, arg1: number[]): Java.java.nio.ShortBuffer;
                hasArray(): boolean;
                array(): number[];
                arrayOffset(): number;
                position(arg0: number): Java.java.nio.ShortBuffer;
                limit(arg0: number): Java.java.nio.ShortBuffer;
                mark(): Java.java.nio.ShortBuffer;
                reset(): Java.java.nio.ShortBuffer;
                clear(): Java.java.nio.ShortBuffer;
                flip(): Java.java.nio.ShortBuffer;
                rewind(): Java.java.nio.ShortBuffer;
                compact(): Java.java.nio.ShortBuffer;
                isDirect(): boolean;
                toString(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                compareTo(arg0: Java.java.nio.ShortBuffer): number;
                mismatch(arg0: Java.java.nio.ShortBuffer): number;
                order(): Java.java.nio.ByteOrder;
                
            }
            export interface MappedByteBuffer extends Java.java.nio.ByteBuffer {
                
            
                isLoaded(): boolean;
                load(): Java.java.nio.MappedByteBuffer;
                force(): Java.java.nio.MappedByteBuffer;
                force(arg0: number, arg1: number): Java.java.nio.MappedByteBuffer;
                position(arg0: number): Java.java.nio.MappedByteBuffer;
                limit(arg0: number): Java.java.nio.MappedByteBuffer;
                mark(): Java.java.nio.MappedByteBuffer;
                reset(): Java.java.nio.MappedByteBuffer;
                clear(): Java.java.nio.MappedByteBuffer;
                flip(): Java.java.nio.MappedByteBuffer;
                rewind(): Java.java.nio.MappedByteBuffer;
                
            }
        
            export namespace file {
            
                export interface CopyOption extends Java.Interface {
                    
                
                    
                }
                export interface DirectoryStream<T> extends Java.Interface, Java.java.io.Closeable, Java.Iterable<T> {
                    
                
                    iterator(): Java.java.util.Iterator<T>;
                    
                }
                export interface DirectoryStream$Filter<T> extends Java.Interface {
                    
                
                    accept(arg0: T): boolean;
                    
                }
                export interface LinkOption extends Java.Enum<Java.java.nio.file.LinkOption>, Java.java.nio.file.OpenOption, Java.java.nio.file.CopyOption {
                    // static
                    readonly NOFOLLOW_LINKS: Java.java.nio.file.LinkOption;
                    
                
                    // static
                    values(): Java.java.nio.file.LinkOption[];
                    // static
                    valueOf(arg0: string): Java.java.nio.file.LinkOption;
                    
                }
                export interface Path extends Java.Interface, Java.Comparable<Java.java.nio.file.Path>, Java.Iterable<Java.java.nio.file.Path>, Java.java.nio.file.Watchable {
                    
                
                    // static
                    of(arg0: string, arg1: string[]): Java.java.nio.file.Path;
                    // static
                    of(arg0: Java.java.net.URI): Java.java.nio.file.Path;
                    getFileSystem(): Java.java.nio.file.FileSystem;
                    isAbsolute(): boolean;
                    getRoot(): Java.java.nio.file.Path;
                    getFileName(): Java.java.nio.file.Path;
                    getParent(): Java.java.nio.file.Path;
                    getNameCount(): number;
                    getName(arg0: number): Java.java.nio.file.Path;
                    subpath(arg0: number, arg1: number): Java.java.nio.file.Path;
                    startsWith(arg0: Java.java.nio.file.Path): boolean;
                    startsWith(arg0: string): boolean;
                    endsWith(arg0: Java.java.nio.file.Path): boolean;
                    endsWith(arg0: string): boolean;
                    normalize(): Java.java.nio.file.Path;
                    resolve(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                    resolve(arg0: string): Java.java.nio.file.Path;
                    resolveSibling(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                    resolveSibling(arg0: string): Java.java.nio.file.Path;
                    relativize(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                    toUri(): Java.java.net.URI;
                    toAbsolutePath(): Java.java.nio.file.Path;
                    toRealPath(arg0: Java.java.nio.file.LinkOption[]): Java.java.nio.file.Path;
                    toFile(): Java.java.io.File;
                    register(arg0: Java.java.nio.file.WatchService, arg1: Java.java.nio.file.WatchEvent$Kind<any>[], arg2: Java.java.nio.file.WatchEvent$Modifier[]): Java.java.nio.file.WatchKey;
                    register(arg0: Java.java.nio.file.WatchService, arg1: Java.java.nio.file.WatchEvent$Kind<any>[]): Java.java.nio.file.WatchKey;
                    iterator(): Java.java.util.Iterator<Java.java.nio.file.Path>;
                    compareTo(arg0: Java.java.nio.file.Path): number;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    
                }
                export interface WatchKey extends Java.Interface {
                    
                
                    isValid(): boolean;
                    pollEvents(): Java.java.util.List<Java.java.nio.file.WatchEvent<any>>;
                    reset(): boolean;
                    cancel(): void;
                    watchable(): Java.java.nio.file.Watchable;
                    
                }
                export interface WatchService extends Java.Interface, Java.java.io.Closeable {
                    
                
                    close(): void;
                    poll(): Java.java.nio.file.WatchKey;
                    poll(arg0: number, arg1: Java.java.util.concurrent.TimeUnit): Java.java.nio.file.WatchKey;
                    take(): Java.java.nio.file.WatchKey;
                    
                }
                export interface Watchable extends Java.Interface {
                    
                
                    register(arg0: Java.java.nio.file.WatchService, arg1: Java.java.nio.file.WatchEvent$Kind<any>[], arg2: Java.java.nio.file.WatchEvent$Modifier[]): Java.java.nio.file.WatchKey;
                    register(arg0: Java.java.nio.file.WatchService, arg1: Java.java.nio.file.WatchEvent$Kind<any>[]): Java.java.nio.file.WatchKey;
                    
                }
                export interface WatchEvent$Modifier extends Java.Interface {
                    
                
                    name(): string;
                    
                }
                export interface OpenOption extends Java.Interface {
                    
                
                    
                }
                export interface FileSystem extends Java.Object, Java.java.io.Closeable {
                    
                
                    provider(): Java.java.nio.file.spi.FileSystemProvider;
                    close(): void;
                    isOpen(): boolean;
                    isReadOnly(): boolean;
                    getSeparator(): string;
                    getRootDirectories(): Java.Iterable<Java.java.nio.file.Path>;
                    getFileStores(): Java.Iterable<Java.java.nio.file.FileStore>;
                    supportedFileAttributeViews(): Java.java.util.Set<string>;
                    getPath(arg0: string, arg1: string[]): Java.java.nio.file.Path;
                    getPathMatcher(arg0: string): Java.java.nio.file.PathMatcher;
                    getUserPrincipalLookupService(): Java.java.nio.file.attribute.UserPrincipalLookupService;
                    newWatchService(): Java.java.nio.file.WatchService;
                    
                }
                export interface WatchEvent$Kind<T> extends Java.Interface {
                    
                
                    name(): string;
                    type(): Java.Class<T>;
                    
                }
                export interface PathMatcher extends Java.Interface {
                    
                
                    matches(arg0: Java.java.nio.file.Path): boolean;
                    
                }
                export interface FileStore extends Java.Object {
                    
                
                    name(): string;
                    type(): string;
                    isReadOnly(): boolean;
                    getTotalSpace(): number;
                    getUsableSpace(): number;
                    getUnallocatedSpace(): number;
                    getBlockSize(): number;
                    supportsFileAttributeView(arg0: Java.Class<any>): boolean;
                    supportsFileAttributeView(arg0: string): boolean;
                    getFileStoreAttributeView<V>(arg0: Java.Class<V>): V;
                    getAttribute(arg0: string): Java.Object;
                    
                }
                export interface WatchEvent<T> extends Java.Interface {
                    
                
                    kind(): Java.java.nio.file.WatchEvent$Kind<T>;
                    count(): number;
                    context(): T;
                    
                }
                export interface AccessMode extends Java.Enum<Java.java.nio.file.AccessMode> {
                    // static
                    readonly READ: Java.java.nio.file.AccessMode;
                    // static
                    readonly WRITE: Java.java.nio.file.AccessMode;
                    // static
                    readonly EXECUTE: Java.java.nio.file.AccessMode;
                    
                
                    // static
                    values(): Java.java.nio.file.AccessMode[];
                    // static
                    valueOf(arg0: string): Java.java.nio.file.AccessMode;
                    
                }
            
                export namespace attribute {
                
                    export interface FileAttribute<T> extends Java.Interface {
                        
                    
                        name(): string;
                        value(): T;
                        
                    }
                    export interface UserPrincipalLookupService extends Java.Object {
                        
                    
                        lookupPrincipalByName(arg0: string): Java.java.nio.file.attribute.UserPrincipal;
                        lookupPrincipalByGroupName(arg0: string): Java.java.nio.file.attribute.GroupPrincipal;
                        
                    }
                    export interface UserPrincipal extends Java.Interface, Java.java.security.Principal {
                        
                    
                        
                    }
                    export interface GroupPrincipal extends Java.Interface, Java.java.nio.file.attribute.UserPrincipal {
                        
                    
                        
                    }
                }
            
                export namespace spi {
                
                    export interface FileSystemProvider extends Java.Object {
                        
                    
                        // static
                        installedProviders(): Java.java.util.List<Java.java.nio.file.spi.FileSystemProvider>;
                        getScheme(): string;
                        newFileSystem(arg0: Java.java.net.URI, arg1: Java.java.util.Map<string, any>): Java.java.nio.file.FileSystem;
                        getFileSystem(arg0: Java.java.net.URI): Java.java.nio.file.FileSystem;
                        getPath(arg0: Java.java.net.URI): Java.java.nio.file.Path;
                        newFileSystem(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Map<string, any>): Java.java.nio.file.FileSystem;
                        newInputStream(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.OpenOption[]): Java.java.io.InputStream;
                        newOutputStream(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.OpenOption[]): Java.java.io.OutputStream;
                        newFileChannel(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.FileChannel;
                        newAsynchronousFileChannel(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.util.concurrent.ExecutorService, arg3: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.AsynchronousFileChannel;
                        newByteChannel(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.SeekableByteChannel;
                        newDirectoryStream(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.DirectoryStream$Filter<any>): Java.java.nio.file.DirectoryStream<Java.java.nio.file.Path>;
                        createDirectory(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.attribute.FileAttribute<any>[]): void;
                        createSymbolicLink(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): void;
                        createLink(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path): void;
                        delete(arg0: Java.java.nio.file.Path): void;
                        deleteIfExists(arg0: Java.java.nio.file.Path): boolean;
                        readSymbolicLink(arg0: Java.java.nio.file.Path): Java.java.nio.file.Path;
                        copy(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.CopyOption[]): void;
                        move(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path, arg2: Java.java.nio.file.CopyOption[]): void;
                        isSameFile(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.Path): boolean;
                        isHidden(arg0: Java.java.nio.file.Path): boolean;
                        getFileStore(arg0: Java.java.nio.file.Path): Java.java.nio.file.FileStore;
                        checkAccess(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.AccessMode[]): void;
                        getFileAttributeView<V>(arg0: Java.java.nio.file.Path, arg1: Java.Class<V>, arg2: Java.java.nio.file.LinkOption[]): V;
                        readAttributes<A>(arg0: Java.java.nio.file.Path, arg1: Java.Class<A>, arg2: Java.java.nio.file.LinkOption[]): A;
                        readAttributes(arg0: Java.java.nio.file.Path, arg1: string, arg2: Java.java.nio.file.LinkOption[]): Java.java.util.Map<string, Java.Object>;
                        setAttribute(arg0: Java.java.nio.file.Path, arg1: string, arg2: Java.Object, arg3: Java.java.nio.file.LinkOption[]): void;
                        
                    }
                }
            }
        
            export namespace channels {
            
                export interface AsynchronousFileChannel extends Java.Object, Java.java.nio.channels.AsynchronousChannel {
                    
                
                    // static
                    open(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.util.concurrent.ExecutorService, arg3: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.AsynchronousFileChannel;
                    // static
                    open(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.OpenOption[]): Java.java.nio.channels.AsynchronousFileChannel;
                    size(): number;
                    truncate(arg0: number): Java.java.nio.channels.AsynchronousFileChannel;
                    force(arg0: boolean): void;
                    lock<A>(arg0: number, arg1: number, arg2: boolean, arg3: A, arg4: Java.java.nio.channels.CompletionHandler<Java.java.nio.channels.FileLock, any>): void;
                    lock<A>(arg0: A, arg1: Java.java.nio.channels.CompletionHandler<Java.java.nio.channels.FileLock, any>): void;
                    lock(arg0: number, arg1: number, arg2: boolean): Java.java.util.concurrent.Future<Java.java.nio.channels.FileLock>;
                    lock(): Java.java.util.concurrent.Future<Java.java.nio.channels.FileLock>;
                    tryLock(arg0: number, arg1: number, arg2: boolean): Java.java.nio.channels.FileLock;
                    tryLock(): Java.java.nio.channels.FileLock;
                    read<A>(arg0: Java.java.nio.ByteBuffer, arg1: number, arg2: A, arg3: Java.java.nio.channels.CompletionHandler<number, any>): void;
                    read(arg0: Java.java.nio.ByteBuffer, arg1: number): Java.java.util.concurrent.Future<number>;
                    write<A>(arg0: Java.java.nio.ByteBuffer, arg1: number, arg2: A, arg3: Java.java.nio.channels.CompletionHandler<number, any>): void;
                    write(arg0: Java.java.nio.ByteBuffer, arg1: number): Java.java.util.concurrent.Future<number>;
                    
                }
                export interface SeekableByteChannel extends Java.Interface, Java.java.nio.channels.ByteChannel {
                    
                
                    read(arg0: Java.java.nio.ByteBuffer): number;
                    write(arg0: Java.java.nio.ByteBuffer): number;
                    position(): number;
                    position(arg0: number): Java.java.nio.channels.SeekableByteChannel;
                    size(): number;
                    truncate(arg0: number): Java.java.nio.channels.SeekableByteChannel;
                    
                }
                export interface FileChannel extends Java.java.nio.channels.spi.AbstractInterruptibleChannel, Java.java.nio.channels.SeekableByteChannel, Java.java.nio.channels.GatheringByteChannel, Java.java.nio.channels.ScatteringByteChannel {
                    
                
                    // static
                    open(arg0: Java.java.nio.file.Path, arg1: Java.java.util.Set<any>, arg2: Java.java.nio.file.attribute.FileAttribute<any>[]): Java.java.nio.channels.FileChannel;
                    // static
                    open(arg0: Java.java.nio.file.Path, arg1: Java.java.nio.file.OpenOption[]): Java.java.nio.channels.FileChannel;
                    read(arg0: Java.java.nio.ByteBuffer): number;
                    read(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    read(arg0: Java.java.nio.ByteBuffer[]): number;
                    write(arg0: Java.java.nio.ByteBuffer): number;
                    write(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    write(arg0: Java.java.nio.ByteBuffer[]): number;
                    position(): number;
                    position(arg0: number): Java.java.nio.channels.FileChannel;
                    size(): number;
                    truncate(arg0: number): Java.java.nio.channels.FileChannel;
                    force(arg0: boolean): void;
                    transferTo(arg0: number, arg1: number, arg2: Java.java.nio.channels.WritableByteChannel): number;
                    transferFrom(arg0: Java.java.nio.channels.ReadableByteChannel, arg1: number, arg2: number): number;
                    read(arg0: Java.java.nio.ByteBuffer, arg1: number): number;
                    write(arg0: Java.java.nio.ByteBuffer, arg1: number): number;
                    map(arg0: Java.java.nio.channels.FileChannel$MapMode, arg1: number, arg2: number): Java.java.nio.MappedByteBuffer;
                    lock(arg0: number, arg1: number, arg2: boolean): Java.java.nio.channels.FileLock;
                    lock(): Java.java.nio.channels.FileLock;
                    tryLock(arg0: number, arg1: number, arg2: boolean): Java.java.nio.channels.FileLock;
                    tryLock(): Java.java.nio.channels.FileLock;
                    
                }
                export interface FileChannel$MapMode extends Java.Object {
                    // static
                    readonly READ_ONLY: Java.java.nio.channels.FileChannel$MapMode;
                    // static
                    readonly READ_WRITE: Java.java.nio.channels.FileChannel$MapMode;
                    // static
                    readonly PRIVATE: Java.java.nio.channels.FileChannel$MapMode;
                    
                
                    toString(): string;
                    
                }
                export interface WritableByteChannel extends Java.Interface, Java.java.nio.channels.Channel {
                    
                
                    write(arg0: Java.java.nio.ByteBuffer): number;
                    
                }
                export interface Channel extends Java.Interface, Java.java.io.Closeable {
                    
                
                    isOpen(): boolean;
                    close(): void;
                    
                }
                export interface GatheringByteChannel extends Java.Interface, Java.java.nio.channels.WritableByteChannel {
                    
                
                    write(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    write(arg0: Java.java.nio.ByteBuffer[]): number;
                    
                }
                export interface InterruptibleChannel extends Java.Interface, Java.java.nio.channels.Channel {
                    
                
                    close(): void;
                    
                }
                export interface FileLock extends Java.Object, Java.AutoCloseable {
                    
                
                    channel(): Java.java.nio.channels.FileChannel;
                    acquiredBy(): Java.java.nio.channels.Channel;
                    position(): number;
                    size(): number;
                    isShared(): boolean;
                    overlaps(arg0: number, arg1: number): boolean;
                    isValid(): boolean;
                    release(): void;
                    close(): void;
                    toString(): string;
                    
                }
                export interface CompletionHandler<V, A> extends Java.Interface {
                    
                
                    completed(arg0: V, arg1: A): void;
                    failed(arg0: Java.Throwable, arg1: A): void;
                    
                }
                export interface ByteChannel extends Java.Interface, Java.java.nio.channels.ReadableByteChannel, Java.java.nio.channels.WritableByteChannel {
                    
                
                    
                }
                export interface ReadableByteChannel extends Java.Interface, Java.java.nio.channels.Channel {
                    
                
                    read(arg0: Java.java.nio.ByteBuffer): number;
                    
                }
                export interface AsynchronousChannel extends Java.Interface, Java.java.nio.channels.Channel {
                    
                
                    close(): void;
                    
                }
                export interface ScatteringByteChannel extends Java.Interface, Java.java.nio.channels.ReadableByteChannel {
                    
                
                    read(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    read(arg0: Java.java.nio.ByteBuffer[]): number;
                    
                }
                export interface SocketChannel extends Java.java.nio.channels.spi.AbstractSelectableChannel, Java.java.nio.channels.ByteChannel, Java.java.nio.channels.ScatteringByteChannel, Java.java.nio.channels.GatheringByteChannel, Java.java.nio.channels.NetworkChannel {
                    
                
                    // static
                    open(): Java.java.nio.channels.SocketChannel;
                    // static
                    open(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.SocketChannel;
                    // static
                    open(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.SocketChannel;
                    validOps(): number;
                    bind(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.SocketChannel;
                    setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.nio.channels.SocketChannel;
                    shutdownInput(): Java.java.nio.channels.SocketChannel;
                    shutdownOutput(): Java.java.nio.channels.SocketChannel;
                    socket(): Java.java.net.Socket;
                    isConnected(): boolean;
                    isConnectionPending(): boolean;
                    connect(arg0: Java.java.net.SocketAddress): boolean;
                    finishConnect(): boolean;
                    getRemoteAddress(): Java.java.net.SocketAddress;
                    read(arg0: Java.java.nio.ByteBuffer): number;
                    read(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    read(arg0: Java.java.nio.ByteBuffer[]): number;
                    write(arg0: Java.java.nio.ByteBuffer): number;
                    write(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    write(arg0: Java.java.nio.ByteBuffer[]): number;
                    getLocalAddress(): Java.java.net.SocketAddress;
                    
                }
                export interface SelectionKey extends Java.Object {
                    // static
                    readonly OP_READ: number;
                    // static
                    readonly OP_WRITE: number;
                    // static
                    readonly OP_CONNECT: number;
                    // static
                    readonly OP_ACCEPT: number;
                    
                
                    channel(): Java.java.nio.channels.SelectableChannel;
                    selector(): Java.java.nio.channels.Selector;
                    isValid(): boolean;
                    cancel(): void;
                    interestOps(): number;
                    interestOps(arg0: number): Java.java.nio.channels.SelectionKey;
                    interestOpsOr(arg0: number): number;
                    interestOpsAnd(arg0: number): number;
                    readyOps(): number;
                    isReadable(): boolean;
                    isWritable(): boolean;
                    isConnectable(): boolean;
                    isAcceptable(): boolean;
                    attach(arg0: Java.Object): Java.Object;
                    attachment(): Java.Object;
                    
                }
                export interface Selector extends Java.Object, Java.java.io.Closeable {
                    
                
                    // static
                    open(): Java.java.nio.channels.Selector;
                    isOpen(): boolean;
                    provider(): Java.java.nio.channels.spi.SelectorProvider;
                    keys(): Java.java.util.Set<Java.java.nio.channels.SelectionKey>;
                    selectedKeys(): Java.java.util.Set<Java.java.nio.channels.SelectionKey>;
                    selectNow(): number;
                    select(arg0: number): number;
                    select(): number;
                    select(arg0: Java.java.util._function.Consumer<Java.java.nio.channels.SelectionKey>, arg1: number): number;
                    select(arg0: Java.java.util._function.Consumer<Java.java.nio.channels.SelectionKey>): number;
                    selectNow(arg0: Java.java.util._function.Consumer<Java.java.nio.channels.SelectionKey>): number;
                    wakeup(): Java.java.nio.channels.Selector;
                    close(): void;
                    
                }
                export interface ServerSocketChannel extends Java.java.nio.channels.spi.AbstractSelectableChannel, Java.java.nio.channels.NetworkChannel {
                    
                
                    // static
                    open(): Java.java.nio.channels.ServerSocketChannel;
                    // static
                    open(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.ServerSocketChannel;
                    validOps(): number;
                    bind(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.ServerSocketChannel;
                    bind(arg0: Java.java.net.SocketAddress, arg1: number): Java.java.nio.channels.ServerSocketChannel;
                    setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.nio.channels.ServerSocketChannel;
                    socket(): Java.java.net.ServerSocket;
                    accept(): Java.java.nio.channels.SocketChannel;
                    getLocalAddress(): Java.java.net.SocketAddress;
                    
                }
                export interface Pipe extends Java.Object {
                    
                
                    source(): Java.java.nio.channels.Pipe$SourceChannel;
                    sink(): Java.java.nio.channels.Pipe$SinkChannel;
                    // static
                    open(): Java.java.nio.channels.Pipe;
                    
                }
                export interface NetworkChannel extends Java.Interface, Java.java.nio.channels.Channel {
                    
                
                    bind(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.NetworkChannel;
                    getLocalAddress(): Java.java.net.SocketAddress;
                    setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.nio.channels.NetworkChannel;
                    getOption<T>(arg0: Java.java.net.SocketOption<T>): T;
                    supportedOptions(): Java.java.util.Set<Java.java.net.SocketOption<any>>;
                    
                }
                export interface SelectableChannel extends Java.java.nio.channels.spi.AbstractInterruptibleChannel, Java.java.nio.channels.Channel {
                    
                
                    provider(): Java.java.nio.channels.spi.SelectorProvider;
                    validOps(): number;
                    isRegistered(): boolean;
                    keyFor(arg0: Java.java.nio.channels.Selector): Java.java.nio.channels.SelectionKey;
                    register(arg0: Java.java.nio.channels.Selector, arg1: number, arg2: Java.Object): Java.java.nio.channels.SelectionKey;
                    register(arg0: Java.java.nio.channels.Selector, arg1: number): Java.java.nio.channels.SelectionKey;
                    configureBlocking(arg0: boolean): Java.java.nio.channels.SelectableChannel;
                    isBlocking(): boolean;
                    blockingLock(): Java.Object;
                    
                }
                export interface DatagramChannel extends Java.java.nio.channels.spi.AbstractSelectableChannel, Java.java.nio.channels.ByteChannel, Java.java.nio.channels.ScatteringByteChannel, Java.java.nio.channels.GatheringByteChannel, Java.java.nio.channels.MulticastChannel {
                    
                
                    // static
                    open(): Java.java.nio.channels.DatagramChannel;
                    // static
                    open(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.DatagramChannel;
                    validOps(): number;
                    bind(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.DatagramChannel;
                    setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.nio.channels.DatagramChannel;
                    socket(): Java.java.net.DatagramSocket;
                    isConnected(): boolean;
                    connect(arg0: Java.java.net.SocketAddress): Java.java.nio.channels.DatagramChannel;
                    disconnect(): Java.java.nio.channels.DatagramChannel;
                    getRemoteAddress(): Java.java.net.SocketAddress;
                    receive(arg0: Java.java.nio.ByteBuffer): Java.java.net.SocketAddress;
                    send(arg0: Java.java.nio.ByteBuffer, arg1: Java.java.net.SocketAddress): number;
                    read(arg0: Java.java.nio.ByteBuffer): number;
                    read(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    read(arg0: Java.java.nio.ByteBuffer[]): number;
                    write(arg0: Java.java.nio.ByteBuffer): number;
                    write(arg0: Java.java.nio.ByteBuffer[], arg1: number, arg2: number): number;
                    write(arg0: Java.java.nio.ByteBuffer[]): number;
                    getLocalAddress(): Java.java.net.SocketAddress;
                    
                }
                export interface Pipe$SinkChannel extends Java.java.nio.channels.spi.AbstractSelectableChannel, Java.java.nio.channels.WritableByteChannel, Java.java.nio.channels.GatheringByteChannel {
                    
                
                    validOps(): number;
                    
                }
                export interface MulticastChannel extends Java.Interface, Java.java.nio.channels.NetworkChannel {
                    
                
                    close(): void;
                    join(arg0: Java.java.net.InetAddress, arg1: Java.java.net.NetworkInterface): Java.java.nio.channels.MembershipKey;
                    join(arg0: Java.java.net.InetAddress, arg1: Java.java.net.NetworkInterface, arg2: Java.java.net.InetAddress): Java.java.nio.channels.MembershipKey;
                    
                }
                export interface Pipe$SourceChannel extends Java.java.nio.channels.spi.AbstractSelectableChannel, Java.java.nio.channels.ReadableByteChannel, Java.java.nio.channels.ScatteringByteChannel {
                    
                
                    validOps(): number;
                    
                }
                export interface MembershipKey extends Java.Object {
                    
                
                    isValid(): boolean;
                    drop(): void;
                    block(arg0: Java.java.net.InetAddress): Java.java.nio.channels.MembershipKey;
                    unblock(arg0: Java.java.net.InetAddress): Java.java.nio.channels.MembershipKey;
                    channel(): Java.java.nio.channels.MulticastChannel;
                    group(): Java.java.net.InetAddress;
                    networkInterface(): Java.java.net.NetworkInterface;
                    sourceAddress(): Java.java.net.InetAddress;
                    
                }
            
                export namespace spi {
                
                    export interface AbstractInterruptibleChannel extends Java.Object, Java.java.nio.channels.Channel, Java.java.nio.channels.InterruptibleChannel {
                        
                    
                        close(): void;
                        isOpen(): boolean;
                        
                    }
                    export interface AbstractSelectableChannel extends Java.java.nio.channels.SelectableChannel {
                        
                    
                        provider(): Java.java.nio.channels.spi.SelectorProvider;
                        isRegistered(): boolean;
                        keyFor(arg0: Java.java.nio.channels.Selector): Java.java.nio.channels.SelectionKey;
                        register(arg0: Java.java.nio.channels.Selector, arg1: number, arg2: Java.Object): Java.java.nio.channels.SelectionKey;
                        isBlocking(): boolean;
                        blockingLock(): Java.Object;
                        configureBlocking(arg0: boolean): Java.java.nio.channels.SelectableChannel;
                        
                    }
                    export interface SelectorProvider extends Java.Object {
                        
                    
                        // static
                        provider(): Java.java.nio.channels.spi.SelectorProvider;
                        openDatagramChannel(): Java.java.nio.channels.DatagramChannel;
                        openDatagramChannel(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.DatagramChannel;
                        openPipe(): Java.java.nio.channels.Pipe;
                        openSelector(): Java.java.nio.channels.spi.AbstractSelector;
                        openServerSocketChannel(): Java.java.nio.channels.ServerSocketChannel;
                        openSocketChannel(): Java.java.nio.channels.SocketChannel;
                        inheritedChannel(): Java.java.nio.channels.Channel;
                        openSocketChannel(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.SocketChannel;
                        openServerSocketChannel(arg0: Java.java.net.ProtocolFamily): Java.java.nio.channels.ServerSocketChannel;
                        
                    }
                    export interface AbstractSelector extends Java.java.nio.channels.Selector {
                        
                    
                        close(): void;
                        isOpen(): boolean;
                        provider(): Java.java.nio.channels.spi.SelectorProvider;
                        
                    }
                }
            }
        
            export namespace charset {
            
                export interface Charset extends Java.Object, Java.Comparable<Java.java.nio.charset.Charset> {
                    
                
                    // static
                    isSupported(arg0: string): boolean;
                    // static
                    forName(arg0: string): Java.java.nio.charset.Charset;
                    // static
                    availableCharsets(): Java.java.util.SortedMap<string, Java.java.nio.charset.Charset>;
                    // static
                    defaultCharset(): Java.java.nio.charset.Charset;
                    name(): string;
                    aliases(): Java.java.util.Set<string>;
                    displayName(): string;
                    isRegistered(): boolean;
                    displayName(arg0: Java.java.util.Locale): string;
                    contains(arg0: Java.java.nio.charset.Charset): boolean;
                    newDecoder(): Java.java.nio.charset.CharsetDecoder;
                    newEncoder(): Java.java.nio.charset.CharsetEncoder;
                    canEncode(): boolean;
                    decode(arg0: Java.java.nio.ByteBuffer): Java.java.nio.CharBuffer;
                    encode(arg0: Java.java.nio.CharBuffer): Java.java.nio.ByteBuffer;
                    encode(arg0: string): Java.java.nio.ByteBuffer;
                    compareTo(arg0: Java.java.nio.charset.Charset): number;
                    hashCode(): number;
                    equals(arg0: Java.Object): boolean;
                    toString(): string;
                    
                }
                export interface CharsetEncoder extends Java.Object {
                    
                
                    charset(): Java.java.nio.charset.Charset;
                    replacement(): number[];
                    replaceWith(arg0: number[]): Java.java.nio.charset.CharsetEncoder;
                    isLegalReplacement(arg0: number[]): boolean;
                    malformedInputAction(): Java.java.nio.charset.CodingErrorAction;
                    onMalformedInput(arg0: Java.java.nio.charset.CodingErrorAction): Java.java.nio.charset.CharsetEncoder;
                    unmappableCharacterAction(): Java.java.nio.charset.CodingErrorAction;
                    onUnmappableCharacter(arg0: Java.java.nio.charset.CodingErrorAction): Java.java.nio.charset.CharsetEncoder;
                    averageBytesPerChar(): number;
                    maxBytesPerChar(): number;
                    encode(arg0: Java.java.nio.CharBuffer, arg1: Java.java.nio.ByteBuffer, arg2: boolean): Java.java.nio.charset.CoderResult;
                    flush(arg0: Java.java.nio.ByteBuffer): Java.java.nio.charset.CoderResult;
                    reset(): Java.java.nio.charset.CharsetEncoder;
                    encode(arg0: Java.java.nio.CharBuffer): Java.java.nio.ByteBuffer;
                    canEncode(arg0: number): boolean;
                    canEncode(arg0: Java.CharSequence): boolean;
                    
                }
                export interface CharsetDecoder extends Java.Object {
                    
                
                    charset(): Java.java.nio.charset.Charset;
                    replacement(): string;
                    replaceWith(arg0: string): Java.java.nio.charset.CharsetDecoder;
                    malformedInputAction(): Java.java.nio.charset.CodingErrorAction;
                    onMalformedInput(arg0: Java.java.nio.charset.CodingErrorAction): Java.java.nio.charset.CharsetDecoder;
                    unmappableCharacterAction(): Java.java.nio.charset.CodingErrorAction;
                    onUnmappableCharacter(arg0: Java.java.nio.charset.CodingErrorAction): Java.java.nio.charset.CharsetDecoder;
                    averageCharsPerByte(): number;
                    maxCharsPerByte(): number;
                    decode(arg0: Java.java.nio.ByteBuffer, arg1: Java.java.nio.CharBuffer, arg2: boolean): Java.java.nio.charset.CoderResult;
                    flush(arg0: Java.java.nio.CharBuffer): Java.java.nio.charset.CoderResult;
                    reset(): Java.java.nio.charset.CharsetDecoder;
                    decode(arg0: Java.java.nio.ByteBuffer): Java.java.nio.CharBuffer;
                    isAutoDetecting(): boolean;
                    isCharsetDetected(): boolean;
                    detectedCharset(): Java.java.nio.charset.Charset;
                    
                }
                export interface CoderResult extends Java.Object {
                    // static
                    readonly UNDERFLOW: Java.java.nio.charset.CoderResult;
                    // static
                    readonly OVERFLOW: Java.java.nio.charset.CoderResult;
                    
                
                    toString(): string;
                    isUnderflow(): boolean;
                    isOverflow(): boolean;
                    isError(): boolean;
                    isMalformed(): boolean;
                    isUnmappable(): boolean;
                    length(): number;
                    // static
                    malformedForLength(arg0: number): Java.java.nio.charset.CoderResult;
                    // static
                    unmappableForLength(arg0: number): Java.java.nio.charset.CoderResult;
                    throwException(): void;
                    
                }
                export interface CodingErrorAction extends Java.Object {
                    // static
                    readonly IGNORE: Java.java.nio.charset.CodingErrorAction;
                    // static
                    readonly REPLACE: Java.java.nio.charset.CodingErrorAction;
                    // static
                    readonly REPORT: Java.java.nio.charset.CodingErrorAction;
                    
                
                    toString(): string;
                    
                }
            }
        }
    
        export namespace math {
        
            export interface BigDecimal extends Java.Number, Java.Comparable<Java.java.math.BigDecimal> {
                // static
                readonly ZERO: Java.java.math.BigDecimal;
                // static
                readonly ONE: Java.java.math.BigDecimal;
                // static
                readonly TEN: Java.java.math.BigDecimal;
                // static
                readonly ROUND_UP: number;
                // static
                readonly ROUND_DOWN: number;
                // static
                readonly ROUND_CEILING: number;
                // static
                readonly ROUND_FLOOR: number;
                // static
                readonly ROUND_HALF_UP: number;
                // static
                readonly ROUND_HALF_DOWN: number;
                // static
                readonly ROUND_HALF_EVEN: number;
                // static
                readonly ROUND_UNNECESSARY: number;
                
            
                // static
                valueOf(arg0: number, arg1: number): Java.java.math.BigDecimal;
                // static
                valueOf(arg0: number): Java.java.math.BigDecimal;
                // static
                valueOf(arg0: number): Java.java.math.BigDecimal;
                add(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                add(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                subtract(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                subtract(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                multiply(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                multiply(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal, arg1: number, arg2: number): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal, arg1: number, arg2: Java.java.math.RoundingMode): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal, arg1: number): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.RoundingMode): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                divide(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                divideToIntegralValue(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                divideToIntegralValue(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                remainder(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                remainder(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                divideAndRemainder(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal[];
                divideAndRemainder(arg0: Java.java.math.BigDecimal, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal[];
                sqrt(arg0: Java.java.math.MathContext): Java.java.math.BigDecimal;
                pow(arg0: number): Java.java.math.BigDecimal;
                pow(arg0: number, arg1: Java.java.math.MathContext): Java.java.math.BigDecimal;
                abs(): Java.java.math.BigDecimal;
                abs(arg0: Java.java.math.MathContext): Java.java.math.BigDecimal;
                negate(): Java.java.math.BigDecimal;
                negate(arg0: Java.java.math.MathContext): Java.java.math.BigDecimal;
                plus(): Java.java.math.BigDecimal;
                plus(arg0: Java.java.math.MathContext): Java.java.math.BigDecimal;
                signum(): number;
                scale(): number;
                precision(): number;
                unscaledValue(): Java.java.math.BigInteger;
                round(arg0: Java.java.math.MathContext): Java.java.math.BigDecimal;
                setScale(arg0: number, arg1: Java.java.math.RoundingMode): Java.java.math.BigDecimal;
                setScale(arg0: number, arg1: number): Java.java.math.BigDecimal;
                setScale(arg0: number): Java.java.math.BigDecimal;
                movePointLeft(arg0: number): Java.java.math.BigDecimal;
                movePointRight(arg0: number): Java.java.math.BigDecimal;
                scaleByPowerOfTen(arg0: number): Java.java.math.BigDecimal;
                stripTrailingZeros(): Java.java.math.BigDecimal;
                compareTo(arg0: Java.java.math.BigDecimal): number;
                equals(arg0: Java.Object): boolean;
                min(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                max(arg0: Java.java.math.BigDecimal): Java.java.math.BigDecimal;
                hashCode(): number;
                toString(): string;
                toEngineeringString(): string;
                toPlainString(): string;
                toBigInteger(): Java.java.math.BigInteger;
                toBigIntegerExact(): Java.java.math.BigInteger;
                longValue(): number;
                longValueExact(): number;
                intValue(): number;
                intValueExact(): number;
                shortValueExact(): number;
                byteValueExact(): number;
                floatValue(): number;
                doubleValue(): number;
                ulp(): Java.java.math.BigDecimal;
                
            }
            export interface BigInteger extends Java.Number, Java.Comparable<Java.java.math.BigInteger> {
                // static
                readonly ZERO: Java.java.math.BigInteger;
                // static
                readonly ONE: Java.java.math.BigInteger;
                // static
                readonly TWO: Java.java.math.BigInteger;
                // static
                readonly TEN: Java.java.math.BigInteger;
                
            
                // static
                probablePrime(arg0: number, arg1: Java.java.util.Random): Java.java.math.BigInteger;
                nextProbablePrime(): Java.java.math.BigInteger;
                // static
                valueOf(arg0: number): Java.java.math.BigInteger;
                add(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                subtract(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                multiply(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                divide(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                divideAndRemainder(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger[];
                remainder(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                pow(arg0: number): Java.java.math.BigInteger;
                sqrt(): Java.java.math.BigInteger;
                sqrtAndRemainder(): Java.java.math.BigInteger[];
                gcd(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                abs(): Java.java.math.BigInteger;
                negate(): Java.java.math.BigInteger;
                signum(): number;
                mod(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                modPow(arg0: Java.java.math.BigInteger, arg1: Java.java.math.BigInteger): Java.java.math.BigInteger;
                modInverse(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                shiftLeft(arg0: number): Java.java.math.BigInteger;
                shiftRight(arg0: number): Java.java.math.BigInteger;
                and(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                or(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                xor(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                not(): Java.java.math.BigInteger;
                andNot(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                testBit(arg0: number): boolean;
                setBit(arg0: number): Java.java.math.BigInteger;
                clearBit(arg0: number): Java.java.math.BigInteger;
                flipBit(arg0: number): Java.java.math.BigInteger;
                getLowestSetBit(): number;
                bitLength(): number;
                bitCount(): number;
                isProbablePrime(arg0: number): boolean;
                compareTo(arg0: Java.java.math.BigInteger): number;
                equals(arg0: Java.Object): boolean;
                min(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                max(arg0: Java.java.math.BigInteger): Java.java.math.BigInteger;
                hashCode(): number;
                toString(arg0: number): string;
                toString(): string;
                toByteArray(): number[];
                intValue(): number;
                longValue(): number;
                floatValue(): number;
                doubleValue(): number;
                longValueExact(): number;
                intValueExact(): number;
                shortValueExact(): number;
                byteValueExact(): number;
                
            }
            export interface RoundingMode extends Java.Enum<Java.java.math.RoundingMode> {
                // static
                readonly UP: Java.java.math.RoundingMode;
                // static
                readonly DOWN: Java.java.math.RoundingMode;
                // static
                readonly CEILING: Java.java.math.RoundingMode;
                // static
                readonly FLOOR: Java.java.math.RoundingMode;
                // static
                readonly HALF_UP: Java.java.math.RoundingMode;
                // static
                readonly HALF_DOWN: Java.java.math.RoundingMode;
                // static
                readonly HALF_EVEN: Java.java.math.RoundingMode;
                // static
                readonly UNNECESSARY: Java.java.math.RoundingMode;
                
            
                // static
                values(): Java.java.math.RoundingMode[];
                // static
                valueOf(arg0: string): Java.java.math.RoundingMode;
                // static
                valueOf(arg0: number): Java.java.math.RoundingMode;
                
            }
            export interface MathContext extends Java.Object, Java.java.io.Serializable {
                // static
                readonly UNLIMITED: Java.java.math.MathContext;
                // static
                readonly DECIMAL32: Java.java.math.MathContext;
                // static
                readonly DECIMAL64: Java.java.math.MathContext;
                // static
                readonly DECIMAL128: Java.java.math.MathContext;
                
            
                getPrecision(): number;
                getRoundingMode(): Java.java.math.RoundingMode;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
        }
    
        export namespace net {
        
            export interface Socket extends Java.Object, Java.java.io.Closeable {
                
            
                connect(arg0: Java.java.net.SocketAddress): void;
                connect(arg0: Java.java.net.SocketAddress, arg1: number): void;
                bind(arg0: Java.java.net.SocketAddress): void;
                getInetAddress(): Java.java.net.InetAddress;
                getLocalAddress(): Java.java.net.InetAddress;
                getPort(): number;
                getLocalPort(): number;
                getRemoteSocketAddress(): Java.java.net.SocketAddress;
                getLocalSocketAddress(): Java.java.net.SocketAddress;
                getChannel(): Java.java.nio.channels.SocketChannel;
                getInputStream(): Java.java.io.InputStream;
                getOutputStream(): Java.java.io.OutputStream;
                setTcpNoDelay(arg0: boolean): void;
                getTcpNoDelay(): boolean;
                setSoLinger(arg0: boolean, arg1: number): void;
                getSoLinger(): number;
                sendUrgentData(arg0: number): void;
                setOOBInline(arg0: boolean): void;
                getOOBInline(): boolean;
                setSoTimeout(arg0: number): void;
                getSoTimeout(): number;
                setSendBufferSize(arg0: number): void;
                getSendBufferSize(): number;
                setReceiveBufferSize(arg0: number): void;
                getReceiveBufferSize(): number;
                setKeepAlive(arg0: boolean): void;
                getKeepAlive(): boolean;
                setTrafficClass(arg0: number): void;
                getTrafficClass(): number;
                setReuseAddress(arg0: boolean): void;
                getReuseAddress(): boolean;
                close(): void;
                shutdownInput(): void;
                shutdownOutput(): void;
                toString(): string;
                isConnected(): boolean;
                isBound(): boolean;
                isClosed(): boolean;
                isInputShutdown(): boolean;
                isOutputShutdown(): boolean;
                // static
                setSocketImplFactory(arg0: Java.java.net.SocketImplFactory): void;
                setPerformancePreferences(arg0: number, arg1: number, arg2: number): void;
                setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.net.Socket;
                getOption<T>(arg0: Java.java.net.SocketOption<T>): T;
                supportedOptions(): Java.java.util.Set<Java.java.net.SocketOption<any>>;
                
            }
            export interface SocketOption<T> extends Java.Interface {
                
            
                name(): string;
                type(): Java.Class<T>;
                
            }
            export interface SocketAddress extends Java.Object, Java.java.io.Serializable {
                
            
                
            }
            export interface InetAddress extends Java.Object, Java.java.io.Serializable {
                
            
                isMulticastAddress(): boolean;
                isAnyLocalAddress(): boolean;
                isLoopbackAddress(): boolean;
                isLinkLocalAddress(): boolean;
                isSiteLocalAddress(): boolean;
                isMCGlobal(): boolean;
                isMCNodeLocal(): boolean;
                isMCLinkLocal(): boolean;
                isMCSiteLocal(): boolean;
                isMCOrgLocal(): boolean;
                isReachable(arg0: number): boolean;
                isReachable(arg0: Java.java.net.NetworkInterface, arg1: number, arg2: number): boolean;
                getHostName(): string;
                getCanonicalHostName(): string;
                getAddress(): number[];
                getHostAddress(): string;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                toString(): string;
                // static
                getByAddress(arg0: string, arg1: number[]): Java.java.net.InetAddress;
                // static
                getByName(arg0: string): Java.java.net.InetAddress;
                // static
                getAllByName(arg0: string): Java.java.net.InetAddress[];
                // static
                getLoopbackAddress(): Java.java.net.InetAddress;
                // static
                getByAddress(arg0: number[]): Java.java.net.InetAddress;
                // static
                getLocalHost(): Java.java.net.InetAddress;
                
            }
            export interface SocketImplFactory extends Java.Interface {
                
            
                createSocketImpl(): Java.java.net.SocketImpl;
                
            }
            export interface NetworkInterface extends Java.Object {
                
            
                getName(): string;
                getInetAddresses(): Java.java.util.Enumeration<Java.java.net.InetAddress>;
                inetAddresses(): Java.java.util.stream.Stream<Java.java.net.InetAddress>;
                getInterfaceAddresses(): Java.java.util.List<Java.java.net.InterfaceAddress>;
                getSubInterfaces(): Java.java.util.Enumeration<Java.java.net.NetworkInterface>;
                subInterfaces(): Java.java.util.stream.Stream<Java.java.net.NetworkInterface>;
                getParent(): Java.java.net.NetworkInterface;
                getIndex(): number;
                getDisplayName(): string;
                // static
                getByName(arg0: string): Java.java.net.NetworkInterface;
                // static
                getByIndex(arg0: number): Java.java.net.NetworkInterface;
                // static
                getByInetAddress(arg0: Java.java.net.InetAddress): Java.java.net.NetworkInterface;
                // static
                getNetworkInterfaces(): Java.java.util.Enumeration<Java.java.net.NetworkInterface>;
                // static
                networkInterfaces(): Java.java.util.stream.Stream<Java.java.net.NetworkInterface>;
                isUp(): boolean;
                isLoopback(): boolean;
                isPointToPoint(): boolean;
                supportsMulticast(): boolean;
                getHardwareAddress(): number[];
                getMTU(): number;
                isVirtual(): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface SocketImpl extends Java.Object, Java.java.net.SocketOptions {
                
            
                toString(): string;
                
            }
            export interface SocketOptions extends Java.Interface {
                // static
                readonly TCP_NODELAY: number;
                // static
                readonly SO_BINDADDR: number;
                // static
                readonly SO_REUSEADDR: number;
                // static
                readonly SO_REUSEPORT: number;
                // static
                readonly SO_BROADCAST: number;
                // static
                readonly IP_MULTICAST_IF: number;
                // static
                readonly IP_MULTICAST_IF2: number;
                // static
                readonly IP_MULTICAST_LOOP: number;
                // static
                readonly IP_TOS: number;
                // static
                readonly SO_LINGER: number;
                // static
                readonly SO_TIMEOUT: number;
                // static
                readonly SO_SNDBUF: number;
                // static
                readonly SO_RCVBUF: number;
                // static
                readonly SO_KEEPALIVE: number;
                // static
                readonly SO_OOBINLINE: number;
                
            
                setOption(arg0: number, arg1: Java.Object): void;
                getOption(arg0: number): Java.Object;
                
            }
            export interface InterfaceAddress extends Java.Object {
                
            
                getAddress(): Java.java.net.InetAddress;
                getBroadcast(): Java.java.net.InetAddress;
                getNetworkPrefixLength(): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface DatagramSocket extends Java.Object, Java.java.io.Closeable {
                
            
                bind(arg0: Java.java.net.SocketAddress): void;
                connect(arg0: Java.java.net.InetAddress, arg1: number): void;
                connect(arg0: Java.java.net.SocketAddress): void;
                disconnect(): void;
                isBound(): boolean;
                isConnected(): boolean;
                getInetAddress(): Java.java.net.InetAddress;
                getPort(): number;
                getRemoteSocketAddress(): Java.java.net.SocketAddress;
                getLocalSocketAddress(): Java.java.net.SocketAddress;
                send(arg0: Java.java.net.DatagramPacket): void;
                receive(arg0: Java.java.net.DatagramPacket): void;
                getLocalAddress(): Java.java.net.InetAddress;
                getLocalPort(): number;
                setSoTimeout(arg0: number): void;
                getSoTimeout(): number;
                setSendBufferSize(arg0: number): void;
                getSendBufferSize(): number;
                setReceiveBufferSize(arg0: number): void;
                getReceiveBufferSize(): number;
                setReuseAddress(arg0: boolean): void;
                getReuseAddress(): boolean;
                setBroadcast(arg0: boolean): void;
                getBroadcast(): boolean;
                setTrafficClass(arg0: number): void;
                getTrafficClass(): number;
                close(): void;
                isClosed(): boolean;
                getChannel(): Java.java.nio.channels.DatagramChannel;
                // static
                setDatagramSocketImplFactory(arg0: Java.java.net.DatagramSocketImplFactory): void;
                setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.net.DatagramSocket;
                getOption<T>(arg0: Java.java.net.SocketOption<T>): T;
                supportedOptions(): Java.java.util.Set<Java.java.net.SocketOption<any>>;
                
            }
            export interface ProtocolFamily extends Java.Interface {
                
            
                name(): string;
                
            }
            export interface ServerSocket extends Java.Object, Java.java.io.Closeable {
                
            
                bind(arg0: Java.java.net.SocketAddress): void;
                bind(arg0: Java.java.net.SocketAddress, arg1: number): void;
                getInetAddress(): Java.java.net.InetAddress;
                getLocalPort(): number;
                getLocalSocketAddress(): Java.java.net.SocketAddress;
                accept(): Java.java.net.Socket;
                close(): void;
                getChannel(): Java.java.nio.channels.ServerSocketChannel;
                isBound(): boolean;
                isClosed(): boolean;
                setSoTimeout(arg0: number): void;
                getSoTimeout(): number;
                setReuseAddress(arg0: boolean): void;
                getReuseAddress(): boolean;
                toString(): string;
                // static
                setSocketFactory(arg0: Java.java.net.SocketImplFactory): void;
                setReceiveBufferSize(arg0: number): void;
                getReceiveBufferSize(): number;
                setPerformancePreferences(arg0: number, arg1: number, arg2: number): void;
                setOption<T>(arg0: Java.java.net.SocketOption<T>, arg1: T): Java.java.net.ServerSocket;
                getOption<T>(arg0: Java.java.net.SocketOption<T>): T;
                supportedOptions(): Java.java.util.Set<Java.java.net.SocketOption<any>>;
                
            }
            export interface DatagramPacket extends Java.Object {
                
            
                getAddress(): Java.java.net.InetAddress;
                getPort(): number;
                getData(): number[];
                getOffset(): number;
                getLength(): number;
                setData(arg0: number[], arg1: number, arg2: number): void;
                setAddress(arg0: Java.java.net.InetAddress): void;
                setPort(arg0: number): void;
                setSocketAddress(arg0: Java.java.net.SocketAddress): void;
                getSocketAddress(): Java.java.net.SocketAddress;
                setData(arg0: number[]): void;
                setLength(arg0: number): void;
                
            }
            export interface DatagramSocketImplFactory extends Java.Interface {
                
            
                createDatagramSocketImpl(): Java.java.net.DatagramSocketImpl;
                
            }
            export interface DatagramSocketImpl extends Java.Object, Java.java.net.SocketOptions {
                
            
                
            }
        }
    
        export namespace text {
        
            export interface Format extends Java.Object, Java.java.io.Serializable, Java.Cloneable {
                
            
                format(arg0: Java.Object): string;
                format(arg0: Java.Object, arg1: Java.StringBuffer, arg2: Java.java.text.FieldPosition): Java.StringBuffer;
                formatToCharacterIterator(arg0: Java.Object): Java.java.text.AttributedCharacterIterator;
                parseObject(arg0: string, arg1: Java.java.text.ParsePosition): Java.Object;
                parseObject(arg0: string): Java.Object;
                clone(): Java.Object;
                
            }
            export interface ParsePosition extends Java.Object {
                
            
                getIndex(): number;
                setIndex(arg0: number): void;
                setErrorIndex(arg0: number): void;
                getErrorIndex(): number;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface AttributedCharacterIterator extends Java.Interface, Java.java.text.CharacterIterator {
                
            
                getRunStart(): number;
                getRunStart(arg0: Java.java.text.AttributedCharacterIterator$Attribute): number;
                getRunStart(arg0: Java.java.util.Set<any>): number;
                getRunLimit(): number;
                getRunLimit(arg0: Java.java.text.AttributedCharacterIterator$Attribute): number;
                getRunLimit(arg0: Java.java.util.Set<any>): number;
                getAttributes(): Java.java.util.Map<Java.java.text.AttributedCharacterIterator$Attribute, Java.Object>;
                getAttribute(arg0: Java.java.text.AttributedCharacterIterator$Attribute): Java.Object;
                getAllAttributeKeys(): Java.java.util.Set<Java.java.text.AttributedCharacterIterator$Attribute>;
                
            }
            export interface FieldPosition extends Java.Object {
                
            
                getFieldAttribute(): Java.java.text.Format$Field;
                getField(): number;
                getBeginIndex(): number;
                getEndIndex(): number;
                setBeginIndex(arg0: number): void;
                setEndIndex(arg0: number): void;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface CharacterIterator extends Java.Interface, Java.Cloneable {
                // static
                readonly DONE: number;
                
            
                first(): number;
                last(): number;
                current(): number;
                next(): number;
                previous(): number;
                setIndex(arg0: number): number;
                getBeginIndex(): number;
                getEndIndex(): number;
                getIndex(): number;
                clone(): Java.Object;
                
            }
            export interface AttributedCharacterIterator$Attribute extends Java.Object, Java.java.io.Serializable {
                // static
                readonly LANGUAGE: Java.java.text.AttributedCharacterIterator$Attribute;
                // static
                readonly READING: Java.java.text.AttributedCharacterIterator$Attribute;
                // static
                readonly INPUT_METHOD_SEGMENT: Java.java.text.AttributedCharacterIterator$Attribute;
                
            
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                toString(): string;
                
            }
            export interface Format$Field extends Java.java.text.AttributedCharacterIterator$Attribute {
                
            
                
            }
        }
    
        export namespace security {
        
            export interface Principal extends Java.Interface {
                
            
                equals(arg0: Java.Object): boolean;
                toString(): string;
                hashCode(): number;
                getName(): string;
                implies(arg0: Java.javax.security.auth.Subject): boolean;
                
            }
            export interface PrivilegedAction<T> extends Java.Interface {
                
            
                run(): T;
                
            }
            export interface PrivilegedExceptionAction<T> extends Java.Interface {
                
            
                run(): T;
                
            }
            export interface AccessControlContext extends Java.Object {
                
            
                getDomainCombiner(): Java.java.security.DomainCombiner;
                checkPermission(arg0: Java.java.security.Permission): void;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                
            }
            export interface Permission extends Java.Object, Java.java.security.Guard, Java.java.io.Serializable {
                
            
                checkGuard(arg0: Java.Object): void;
                implies(arg0: Java.java.security.Permission): boolean;
                equals(arg0: Java.Object): boolean;
                hashCode(): number;
                getName(): string;
                getActions(): string;
                newPermissionCollection(): Java.java.security.PermissionCollection;
                toString(): string;
                
            }
            export interface DomainCombiner extends Java.Interface {
                
            
                combine(arg0: Java.java.security.ProtectionDomain[], arg1: Java.java.security.ProtectionDomain[]): Java.java.security.ProtectionDomain[];
                
            }
            export interface Guard extends Java.Interface {
                
            
                checkGuard(arg0: Java.Object): void;
                
            }
            export interface PermissionCollection extends Java.Object, Java.java.io.Serializable {
                
            
                add(arg0: Java.java.security.Permission): void;
                implies(arg0: Java.java.security.Permission): boolean;
                elements(): Java.java.util.Enumeration<Java.java.security.Permission>;
                elementsAsStream(): Java.java.util.stream.Stream<Java.java.security.Permission>;
                setReadOnly(): void;
                isReadOnly(): boolean;
                toString(): string;
                
            }
            export interface ProtectionDomain extends Java.Object {
                
            
                getCodeSource(): Java.java.security.CodeSource;
                getClassLoader(): Java.ClassLoader;
                getPrincipals(): Java.java.security.Principal[];
                getPermissions(): Java.java.security.PermissionCollection;
                staticPermissionsOnly(): boolean;
                implies(arg0: Java.java.security.Permission): boolean;
                toString(): string;
                
            }
            export interface CodeSource extends Java.Object, Java.java.io.Serializable {
                
            
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                getLocation(): Java.java.net.URL;
                getCertificates(): Java.java.security.cert.Certificate[];
                getCodeSigners(): Java.java.security.CodeSigner[];
                implies(arg0: Java.java.security.CodeSource): boolean;
                toString(): string;
                
            }
            export interface Provider extends Java.java.util.Properties {
                
            
                configure(arg0: string): Java.java.security.Provider;
                isConfigured(): boolean;
                getName(): string;
                getVersion(): number;
                getVersionStr(): string;
                getInfo(): string;
                toString(): string;
                clear(): void;
                load(arg0: Java.java.io.InputStream): void;
                putAll(arg0: Java.java.util.Map<any, any>): void;
                entrySet(): Java.java.util.Set<Java.java.util.Map$Entry<Java.Object, Java.Object>>;
                keySet(): Java.java.util.Set<Java.Object>;
                values(): Java.java.util.Collection<Java.Object>;
                put(arg0: Java.Object, arg1: Java.Object): Java.Object;
                putIfAbsent(arg0: Java.Object, arg1: Java.Object): Java.Object;
                remove(arg0: Java.Object): Java.Object;
                remove(arg0: Java.Object, arg1: Java.Object): boolean;
                replace(arg0: Java.Object, arg1: Java.Object, arg2: Java.Object): boolean;
                replace(arg0: Java.Object, arg1: Java.Object): Java.Object;
                replaceAll(arg0: Java.java.util._function.BiFunction<any, any, any>): void;
                compute(arg0: Java.Object, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                computeIfAbsent(arg0: Java.Object, arg1: Java.java.util._function.Function<any, any>): Java.Object;
                computeIfPresent(arg0: Java.Object, arg1: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                merge(arg0: Java.Object, arg1: Java.Object, arg2: Java.java.util._function.BiFunction<any, any, any>): Java.Object;
                get(arg0: Java.Object): Java.Object;
                getOrDefault(arg0: Java.Object, arg1: Java.Object): Java.Object;
                forEach(arg0: Java.java.util._function.BiConsumer<any, any>): void;
                keys(): Java.java.util.Enumeration<Java.Object>;
                elements(): Java.java.util.Enumeration<Java.Object>;
                getProperty(arg0: string): string;
                getService(arg0: string, arg1: string): Java.java.security.Provider$Service;
                getServices(): Java.java.util.Set<Java.java.security.Provider$Service>;
                
            }
            export interface PublicKey extends Java.Interface, Java.java.security.Key {
                // static
                readonly serialVersionUID: number;
                
            
                
            }
            export interface CodeSigner extends Java.Object, Java.java.io.Serializable {
                
            
                getSignerCertPath(): Java.java.security.cert.CertPath;
                getTimestamp(): Java.java.security.Timestamp;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                toString(): string;
                
            }
            export interface Timestamp extends Java.Object, Java.java.io.Serializable {
                
            
                getTimestamp(): Java.java.util.Date;
                getSignerCertPath(): Java.java.security.cert.CertPath;
                hashCode(): number;
                equals(arg0: Java.Object): boolean;
                toString(): string;
                
            }
            export interface Provider$Service extends Java.Object {
                
            
                getType(): string;
                getAlgorithm(): string;
                getProvider(): Java.java.security.Provider;
                getClassName(): string;
                getAttribute(arg0: string): string;
                newInstance(arg0: Java.Object): Java.Object;
                supportsParameter(arg0: Java.Object): boolean;
                toString(): string;
                
            }
            export interface Key extends Java.Interface, Java.java.io.Serializable {
                // static
                readonly serialVersionUID: number;
                
            
                getAlgorithm(): string;
                getFormat(): string;
                getEncoded(): number[];
                
            }
        
            export namespace cert {
            
                export interface Certificate extends Java.Object, Java.java.io.Serializable {
                    
                
                    getType(): string;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    getEncoded(): number[];
                    verify(arg0: Java.java.security.PublicKey): void;
                    verify(arg0: Java.java.security.PublicKey, arg1: string): void;
                    verify(arg0: Java.java.security.PublicKey, arg1: Java.java.security.Provider): void;
                    toString(): string;
                    getPublicKey(): Java.java.security.PublicKey;
                    
                }
                export interface CertPath extends Java.Object, Java.java.io.Serializable {
                    
                
                    getType(): string;
                    getEncodings(): Java.java.util.Iterator<string>;
                    equals(arg0: Java.Object): boolean;
                    hashCode(): number;
                    toString(): string;
                    getEncoded(): number[];
                    getEncoded(arg0: string): number[];
                    getCertificates(): Java.java.util.List<any>;
                    
                }
            }
        }
    }

    export namespace javassist.util.proxy {
    
        export interface ProxyFactory extends Java.Object {
            // static
            onlyPublicMethods: boolean;
            writeDirectory: string;
            // static
            useCache: boolean;
            // static
            useWriteReplace: boolean;
            // static
            classLoaderProvider: Java.javassist.util.proxy.ProxyFactory$ClassLoaderProvider;
            // static
            nameGenerator: Java.javassist.util.proxy.ProxyFactory$UniqueName;
            
        
            isUseCache(): boolean;
            setUseCache(arg0: boolean): void;
            isUseWriteReplace(): boolean;
            setUseWriteReplace(arg0: boolean): void;
            // static
            isProxyClass(arg0: Java.Class<any>): boolean;
            setSuperclass(arg0: Java.Class<any>): void;
            getSuperclass(): Java.Class<any>;
            setInterfaces(arg0: Java.Class<any>[]): void;
            getInterfaces(): Java.Class<any>[];
            setFilter(arg0: Java.javassist.util.proxy.MethodFilter): void;
            setGenericSignature(arg0: string): void;
            createClass(): Java.Class<any>;
            createClass(arg0: Java.javassist.util.proxy.MethodFilter): Java.Class<any>;
            createClass(arg0: Java.invoke.MethodHandles$Lookup): Java.Class<any>;
            createClass(arg0: Java.invoke.MethodHandles$Lookup, arg1: Java.javassist.util.proxy.MethodFilter): Java.Class<any>;
            getKey(arg0: Java.Class<any>, arg1: Java.Class<any>[], arg2: number[], arg3: boolean): string;
            // static
            getHandler(arg0: Java.javassist.util.proxy.Proxy): Java.javassist.util.proxy.MethodHandler;
            create(arg0: Java.Class<any>[], arg1: Java.Object[], arg2: Java.javassist.util.proxy.MethodHandler): Java.Object;
            create(arg0: Java.Class<any>[], arg1: Java.Object[]): Java.Object;
            setHandler(arg0: Java.javassist.util.proxy.MethodHandler): void;
            
        }
        export interface ProxyFactory$ClassLoaderProvider extends Java.Interface {
            
        
            get(arg0: Java.javassist.util.proxy.ProxyFactory): Java.ClassLoader;
            
        }
        export interface ProxyFactory$UniqueName extends Java.Interface {
            
        
            get(arg0: string): string;
            
        }
        export interface MethodFilter extends Java.Interface {
            
        
            isHandled(arg0: Java.reflect.Method): boolean;
            
        }
        export interface Proxy extends Java.Interface {
            
        
            setHandler(arg0: Java.javassist.util.proxy.MethodHandler): void;
            
        }
        export interface MethodHandler extends Java.Interface {
            
        
            invoke(arg0: Java.Object, arg1: Java.reflect.Method, arg2: Java.reflect.Method, arg3: Java.Object[]): Java.Object;
            
        }
    }

    export namespace ref {
    
        export interface WeakReference<T> extends Java.ref.Reference<T> {
            
        
            
        }
        export interface Reference<T> extends Java.Object {
            
        
            get(): T;
            refersTo(arg0: T): boolean;
            clear(): void;
            isEnqueued(): boolean;
            enqueue(): boolean;
            // static
            reachabilityFence(arg0: Java.Object): void;
            
        }
    }

    export namespace annotation {
    
        export interface Annotation extends Java.Interface {
            
        
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            annotationType(): Java.Class<any>;
            
        }
    }

    export namespace constant {
    
        export interface Constable extends Java.Interface {
            
        
            describeConstable(): Java.java.util.Optional<any>;
            
        }
        export interface ClassDesc extends Java.Interface, Java.constant.ConstantDesc, Java.invoke.TypeDescriptor$OfField<Java.constant.ClassDesc> {
            
        
            // static
            of(arg0: string): Java.constant.ClassDesc;
            // static
            of(arg0: string, arg1: string): Java.constant.ClassDesc;
            // static
            ofDescriptor(arg0: string): Java.constant.ClassDesc;
            arrayType(): Java.constant.ClassDesc;
            arrayType(arg0: number): Java.constant.ClassDesc;
            nested(arg0: string): Java.constant.ClassDesc;
            nested(arg0: string, arg1: string[]): Java.constant.ClassDesc;
            isArray(): boolean;
            isPrimitive(): boolean;
            isClassOrInterface(): boolean;
            componentType(): Java.constant.ClassDesc;
            packageName(): string;
            displayName(): string;
            descriptorString(): string;
            equals(arg0: Java.Object): boolean;
            
        }
        export interface DynamicConstantDesc<T> extends Java.Object, Java.constant.ConstantDesc {
            
        
            // static
            ofCanonical<T>(arg0: Java.constant.DirectMethodHandleDesc, arg1: string, arg2: Java.constant.ClassDesc, arg3: Java.constant.ConstantDesc[]): Java.constant.ConstantDesc;
            // static
            ofNamed<T>(arg0: Java.constant.DirectMethodHandleDesc, arg1: string, arg2: Java.constant.ClassDesc, arg3: Java.constant.ConstantDesc[]): Java.constant.DynamicConstantDesc<T>;
            // static
            of<T>(arg0: Java.constant.DirectMethodHandleDesc, arg1: Java.constant.ConstantDesc[]): Java.constant.DynamicConstantDesc<T>;
            // static
            of<T>(arg0: Java.constant.DirectMethodHandleDesc): Java.constant.DynamicConstantDesc<T>;
            constantName(): string;
            constantType(): Java.constant.ClassDesc;
            bootstrapMethod(): Java.constant.DirectMethodHandleDesc;
            bootstrapArgs(): Java.constant.ConstantDesc[];
            bootstrapArgsList(): Java.java.util.List<Java.constant.ConstantDesc>;
            resolveConstantDesc(arg0: Java.invoke.MethodHandles$Lookup): T;
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            
        }
        export interface ConstantDesc extends Java.Interface {
            
        
            resolveConstantDesc(arg0: Java.invoke.MethodHandles$Lookup): Java.Object;
            
        }
        export interface DirectMethodHandleDesc extends Java.Interface, Java.constant.MethodHandleDesc {
            
        
            kind(): Java.constant.DirectMethodHandleDesc$Kind;
            refKind(): number;
            isOwnerInterface(): boolean;
            owner(): Java.constant.ClassDesc;
            methodName(): string;
            lookupDescriptor(): string;
            
        }
        export interface MethodHandleDesc extends Java.Interface, Java.constant.ConstantDesc {
            
        
            // static
            of(arg0: Java.constant.DirectMethodHandleDesc$Kind, arg1: Java.constant.ClassDesc, arg2: string, arg3: string): Java.constant.DirectMethodHandleDesc;
            // static
            ofMethod(arg0: Java.constant.DirectMethodHandleDesc$Kind, arg1: Java.constant.ClassDesc, arg2: string, arg3: Java.constant.MethodTypeDesc): Java.constant.DirectMethodHandleDesc;
            // static
            ofField(arg0: Java.constant.DirectMethodHandleDesc$Kind, arg1: Java.constant.ClassDesc, arg2: string, arg3: Java.constant.ClassDesc): Java.constant.DirectMethodHandleDesc;
            // static
            ofConstructor(arg0: Java.constant.ClassDesc, arg1: Java.constant.ClassDesc[]): Java.constant.DirectMethodHandleDesc;
            asType(arg0: Java.constant.MethodTypeDesc): Java.constant.MethodHandleDesc;
            invocationType(): Java.constant.MethodTypeDesc;
            equals(arg0: Java.Object): boolean;
            
        }
        export interface DirectMethodHandleDesc$Kind extends Java.Enum<Java.constant.DirectMethodHandleDesc$Kind> {
            // static
            readonly STATIC: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly INTERFACE_STATIC: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly VIRTUAL: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly INTERFACE_VIRTUAL: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly SPECIAL: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly INTERFACE_SPECIAL: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly CONSTRUCTOR: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly GETTER: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly SETTER: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly STATIC_GETTER: Java.constant.DirectMethodHandleDesc$Kind;
            // static
            readonly STATIC_SETTER: Java.constant.DirectMethodHandleDesc$Kind;
            readonly refKind: number;
            readonly isInterface: boolean;
            
        
            // static
            values(): Java.constant.DirectMethodHandleDesc$Kind[];
            // static
            valueOf(arg0: string): Java.constant.DirectMethodHandleDesc$Kind;
            // static
            valueOf(arg0: number): Java.constant.DirectMethodHandleDesc$Kind;
            // static
            valueOf(arg0: number, arg1: boolean): Java.constant.DirectMethodHandleDesc$Kind;
            
        }
        export interface MethodTypeDesc extends Java.Interface, Java.constant.ConstantDesc, Java.invoke.TypeDescriptor$OfMethod<Java.constant.ClassDesc, Java.constant.MethodTypeDesc> {
            
        
            // static
            ofDescriptor(arg0: string): Java.constant.MethodTypeDesc;
            // static
            of(arg0: Java.constant.ClassDesc, arg1: Java.constant.ClassDesc[]): Java.constant.MethodTypeDesc;
            returnType(): Java.constant.ClassDesc;
            parameterCount(): number;
            parameterType(arg0: number): Java.constant.ClassDesc;
            parameterList(): Java.java.util.List<Java.constant.ClassDesc>;
            parameterArray(): Java.constant.ClassDesc[];
            changeReturnType(arg0: Java.constant.ClassDesc): Java.constant.MethodTypeDesc;
            changeParameterType(arg0: number, arg1: Java.constant.ClassDesc): Java.constant.MethodTypeDesc;
            dropParameterTypes(arg0: number, arg1: number): Java.constant.MethodTypeDesc;
            insertParameterTypes(arg0: number, arg1: Java.constant.ClassDesc[]): Java.constant.MethodTypeDesc;
            descriptorString(): string;
            displayDescriptor(): string;
            equals(arg0: Java.Object): boolean;
            
        }
    }

    export namespace invoke {
    
        export interface TypeDescriptor$OfMethod<F, M> extends Java.Interface, Java.invoke.TypeDescriptor {
            
        
            parameterCount(): number;
            parameterType(arg0: number): F;
            returnType(): F;
            parameterArray(): F[];
            parameterList(): Java.java.util.List<F>;
            changeReturnType(arg0: F): M;
            changeParameterType(arg0: number, arg1: F): M;
            dropParameterTypes(arg0: number, arg1: number): M;
            insertParameterTypes(arg0: number, arg1: F[]): M;
            
        }
        export interface TypeDescriptor$OfField<F> extends Java.Interface, Java.invoke.TypeDescriptor {
            
        
            isArray(): boolean;
            isPrimitive(): boolean;
            componentType(): F;
            arrayType(): F;
            
        }
        export interface MethodHandles$Lookup extends Java.Object {
            // static
            readonly PUBLIC: number;
            // static
            readonly PRIVATE: number;
            // static
            readonly PROTECTED: number;
            // static
            readonly PACKAGE: number;
            // static
            readonly MODULE: number;
            // static
            readonly UNCONDITIONAL: number;
            // static
            readonly ORIGINAL: number;
            
        
            lookupClass(): Java.Class<any>;
            previousLookupClass(): Java.Class<any>;
            lookupModes(): number;
            in(arg0: Java.Class<any>): Java.invoke.MethodHandles$Lookup;
            dropLookupMode(arg0: number): Java.invoke.MethodHandles$Lookup;
            defineClass(arg0: number[]): Java.Class<any>;
            defineHiddenClass(arg0: number[], arg1: boolean, arg2: Java.invoke.MethodHandles$Lookup$ClassOption[]): Java.invoke.MethodHandles$Lookup;
            defineHiddenClassWithClassData(arg0: number[], arg1: Java.Object, arg2: boolean, arg3: Java.invoke.MethodHandles$Lookup$ClassOption[]): Java.invoke.MethodHandles$Lookup;
            toString(): string;
            findStatic(arg0: Java.Class<any>, arg1: string, arg2: Java.invoke.MethodType): Java.invoke.MethodHandle;
            findVirtual(arg0: Java.Class<any>, arg1: string, arg2: Java.invoke.MethodType): Java.invoke.MethodHandle;
            findConstructor(arg0: Java.Class<any>, arg1: Java.invoke.MethodType): Java.invoke.MethodHandle;
            findClass(arg0: string): Java.Class<any>;
            ensureInitialized(arg0: Java.Class<any>): Java.Class<any>;
            accessClass(arg0: Java.Class<any>): Java.Class<any>;
            findSpecial(arg0: Java.Class<any>, arg1: string, arg2: Java.invoke.MethodType, arg3: Java.Class<any>): Java.invoke.MethodHandle;
            findGetter(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.MethodHandle;
            findSetter(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.MethodHandle;
            findVarHandle(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.VarHandle;
            findStaticGetter(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.MethodHandle;
            findStaticSetter(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.MethodHandle;
            findStaticVarHandle(arg0: Java.Class<any>, arg1: string, arg2: Java.Class<any>): Java.invoke.VarHandle;
            bind(arg0: Java.Object, arg1: string, arg2: Java.invoke.MethodType): Java.invoke.MethodHandle;
            unreflect(arg0: Java.reflect.Method): Java.invoke.MethodHandle;
            unreflectSpecial(arg0: Java.reflect.Method, arg1: Java.Class<any>): Java.invoke.MethodHandle;
            unreflectConstructor(arg0: Java.reflect.Constructor<any>): Java.invoke.MethodHandle;
            unreflectGetter(arg0: Java.reflect.Field): Java.invoke.MethodHandle;
            unreflectSetter(arg0: Java.reflect.Field): Java.invoke.MethodHandle;
            unreflectVarHandle(arg0: Java.reflect.Field): Java.invoke.VarHandle;
            revealDirect(arg0: Java.invoke.MethodHandle): Java.invoke.MethodHandleInfo;
            hasPrivateAccess(): boolean;
            hasFullPrivilegeAccess(): boolean;
            
        }
        export interface MethodHandles$Lookup$ClassOption extends Java.Enum<Java.invoke.MethodHandles$Lookup$ClassOption> {
            // static
            readonly NESTMATE: Java.invoke.MethodHandles$Lookup$ClassOption;
            // static
            readonly STRONG: Java.invoke.MethodHandles$Lookup$ClassOption;
            
        
            // static
            values(): Java.invoke.MethodHandles$Lookup$ClassOption[];
            // static
            valueOf(arg0: string): Java.invoke.MethodHandles$Lookup$ClassOption;
            
        }
        export interface TypeDescriptor extends Java.Interface {
            
        
            descriptorString(): string;
            
        }
        export interface MethodHandleInfo extends Java.Interface {
            // static
            readonly REF_getField: number;
            // static
            readonly REF_getStatic: number;
            // static
            readonly REF_putField: number;
            // static
            readonly REF_putStatic: number;
            // static
            readonly REF_invokeVirtual: number;
            // static
            readonly REF_invokeStatic: number;
            // static
            readonly REF_invokeSpecial: number;
            // static
            readonly REF_newInvokeSpecial: number;
            // static
            readonly REF_invokeInterface: number;
            
        
            getReferenceKind(): number;
            getDeclaringClass(): Java.Class<any>;
            getName(): string;
            getMethodType(): Java.invoke.MethodType;
            reflectAs<T>(arg0: Java.Class<T>, arg1: Java.invoke.MethodHandles$Lookup): T;
            getModifiers(): number;
            isVarArgs(): boolean;
            // static
            referenceKindToString(arg0: number): string;
            // static
            toString(arg0: number, arg1: Java.Class<any>, arg2: string, arg3: Java.invoke.MethodType): string;
            
        }
        export interface MethodHandle extends Java.Object, Java.constant.Constable {
            
        
            type(): Java.invoke.MethodType;
            invokeExact(arg0: Java.Object[]): Java.Object;
            invoke(arg0: Java.Object[]): Java.Object;
            invokeWithArguments(arg0: Java.Object[]): Java.Object;
            invokeWithArguments(arg0: Java.java.util.List<any>): Java.Object;
            asType(arg0: Java.invoke.MethodType): Java.invoke.MethodHandle;
            asSpreader(arg0: Java.Class<any>, arg1: number): Java.invoke.MethodHandle;
            asSpreader(arg0: number, arg1: Java.Class<any>, arg2: number): Java.invoke.MethodHandle;
            withVarargs(arg0: boolean): Java.invoke.MethodHandle;
            asCollector(arg0: Java.Class<any>, arg1: number): Java.invoke.MethodHandle;
            asCollector(arg0: number, arg1: Java.Class<any>, arg2: number): Java.invoke.MethodHandle;
            asVarargsCollector(arg0: Java.Class<any>): Java.invoke.MethodHandle;
            isVarargsCollector(): boolean;
            asFixedArity(): Java.invoke.MethodHandle;
            bindTo(arg0: Java.Object): Java.invoke.MethodHandle;
            describeConstable(): Java.java.util.Optional<Java.constant.MethodHandleDesc>;
            toString(): string;
            
        }
        export interface MethodType extends Java.Object, Java.constant.Constable, Java.invoke.TypeDescriptor$OfMethod<Java.Class<any>, Java.invoke.MethodType>, Java.java.io.Serializable {
            
        
            // static
            methodType(arg0: Java.Class<any>, arg1: Java.Class<any>[]): Java.invoke.MethodType;
            // static
            methodType(arg0: Java.Class<any>, arg1: Java.java.util.List<Java.Class<any>>): Java.invoke.MethodType;
            // static
            methodType(arg0: Java.Class<any>, arg1: Java.Class<any>, arg2: Java.Class<any>[]): Java.invoke.MethodType;
            // static
            methodType(arg0: Java.Class<any>): Java.invoke.MethodType;
            // static
            methodType(arg0: Java.Class<any>, arg1: Java.Class<any>): Java.invoke.MethodType;
            // static
            methodType(arg0: Java.Class<any>, arg1: Java.invoke.MethodType): Java.invoke.MethodType;
            // static
            genericMethodType(arg0: number, arg1: boolean): Java.invoke.MethodType;
            // static
            genericMethodType(arg0: number): Java.invoke.MethodType;
            changeParameterType(arg0: number, arg1: Java.Class<any>): Java.invoke.MethodType;
            insertParameterTypes(arg0: number, arg1: Java.Class<any>[]): Java.invoke.MethodType;
            appendParameterTypes(arg0: Java.Class<any>[]): Java.invoke.MethodType;
            insertParameterTypes(arg0: number, arg1: Java.java.util.List<Java.Class<any>>): Java.invoke.MethodType;
            appendParameterTypes(arg0: Java.java.util.List<Java.Class<any>>): Java.invoke.MethodType;
            dropParameterTypes(arg0: number, arg1: number): Java.invoke.MethodType;
            changeReturnType(arg0: Java.Class<any>): Java.invoke.MethodType;
            hasPrimitives(): boolean;
            hasWrappers(): boolean;
            erase(): Java.invoke.MethodType;
            generic(): Java.invoke.MethodType;
            wrap(): Java.invoke.MethodType;
            unwrap(): Java.invoke.MethodType;
            parameterType(arg0: number): Java.Class<any>;
            parameterCount(): number;
            returnType(): Java.Class<any>;
            parameterList(): Java.java.util.List<Java.Class<any>>;
            lastParameterType(): Java.Class<any>;
            parameterArray(): Java.Class<any>[];
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            // static
            fromMethodDescriptorString(arg0: string, arg1: Java.ClassLoader): Java.invoke.MethodType;
            toMethodDescriptorString(): string;
            descriptorString(): string;
            describeConstable(): Java.java.util.Optional<Java.constant.MethodTypeDesc>;
            
        }
        export interface VarHandle extends Java.Object, Java.constant.Constable {
            
        
            hasInvokeExactBehavior(): boolean;
            get(arg0: Java.Object[]): Java.Object;
            set(arg0: Java.Object[]): void;
            getVolatile(arg0: Java.Object[]): Java.Object;
            setVolatile(arg0: Java.Object[]): void;
            getOpaque(arg0: Java.Object[]): Java.Object;
            setOpaque(arg0: Java.Object[]): void;
            getAcquire(arg0: Java.Object[]): Java.Object;
            setRelease(arg0: Java.Object[]): void;
            compareAndSet(arg0: Java.Object[]): boolean;
            compareAndExchange(arg0: Java.Object[]): Java.Object;
            compareAndExchangeAcquire(arg0: Java.Object[]): Java.Object;
            compareAndExchangeRelease(arg0: Java.Object[]): Java.Object;
            weakCompareAndSetPlain(arg0: Java.Object[]): boolean;
            weakCompareAndSet(arg0: Java.Object[]): boolean;
            weakCompareAndSetAcquire(arg0: Java.Object[]): boolean;
            weakCompareAndSetRelease(arg0: Java.Object[]): boolean;
            getAndSet(arg0: Java.Object[]): Java.Object;
            getAndSetAcquire(arg0: Java.Object[]): Java.Object;
            getAndSetRelease(arg0: Java.Object[]): Java.Object;
            getAndAdd(arg0: Java.Object[]): Java.Object;
            getAndAddAcquire(arg0: Java.Object[]): Java.Object;
            getAndAddRelease(arg0: Java.Object[]): Java.Object;
            getAndBitwiseOr(arg0: Java.Object[]): Java.Object;
            getAndBitwiseOrAcquire(arg0: Java.Object[]): Java.Object;
            getAndBitwiseOrRelease(arg0: Java.Object[]): Java.Object;
            getAndBitwiseAnd(arg0: Java.Object[]): Java.Object;
            getAndBitwiseAndAcquire(arg0: Java.Object[]): Java.Object;
            getAndBitwiseAndRelease(arg0: Java.Object[]): Java.Object;
            getAndBitwiseXor(arg0: Java.Object[]): Java.Object;
            getAndBitwiseXorAcquire(arg0: Java.Object[]): Java.Object;
            getAndBitwiseXorRelease(arg0: Java.Object[]): Java.Object;
            withInvokeExactBehavior(): Java.invoke.VarHandle;
            withInvokeBehavior(): Java.invoke.VarHandle;
            toString(): string;
            varType(): Java.Class<any>;
            coordinateTypes(): Java.java.util.List<Java.Class<any>>;
            accessModeType(arg0: Java.invoke.VarHandle$AccessMode): Java.invoke.MethodType;
            isAccessModeSupported(arg0: Java.invoke.VarHandle$AccessMode): boolean;
            toMethodHandle(arg0: Java.invoke.VarHandle$AccessMode): Java.invoke.MethodHandle;
            describeConstable(): Java.java.util.Optional<Java.invoke.VarHandle$VarHandleDesc>;
            // static
            fullFence(): void;
            // static
            acquireFence(): void;
            // static
            releaseFence(): void;
            // static
            loadLoadFence(): void;
            // static
            storeStoreFence(): void;
            
        }
        export interface VarHandle$VarHandleDesc extends Java.constant.DynamicConstantDesc<Java.invoke.VarHandle> {
            
        
            // static
            ofField(arg0: Java.constant.ClassDesc, arg1: string, arg2: Java.constant.ClassDesc): Java.invoke.VarHandle$VarHandleDesc;
            // static
            ofStaticField(arg0: Java.constant.ClassDesc, arg1: string, arg2: Java.constant.ClassDesc): Java.invoke.VarHandle$VarHandleDesc;
            // static
            ofArray(arg0: Java.constant.ClassDesc): Java.invoke.VarHandle$VarHandleDesc;
            varType(): Java.constant.ClassDesc;
            resolveConstantDesc(arg0: Java.invoke.MethodHandles$Lookup): Java.invoke.VarHandle;
            toString(): string;
            
        }
        export interface VarHandle$AccessMode extends Java.Enum<Java.invoke.VarHandle$AccessMode> {
            // static
            readonly GET: Java.invoke.VarHandle$AccessMode;
            // static
            readonly SET: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_VOLATILE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly SET_VOLATILE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly SET_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_OPAQUE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly SET_OPAQUE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly COMPARE_AND_SET: Java.invoke.VarHandle$AccessMode;
            // static
            readonly COMPARE_AND_EXCHANGE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly COMPARE_AND_EXCHANGE_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly COMPARE_AND_EXCHANGE_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly WEAK_COMPARE_AND_SET_PLAIN: Java.invoke.VarHandle$AccessMode;
            // static
            readonly WEAK_COMPARE_AND_SET: Java.invoke.VarHandle$AccessMode;
            // static
            readonly WEAK_COMPARE_AND_SET_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly WEAK_COMPARE_AND_SET_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_SET: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_SET_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_SET_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_ADD: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_ADD_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_ADD_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_OR: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_OR_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_OR_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_AND: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_AND_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_AND_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_XOR: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_XOR_RELEASE: Java.invoke.VarHandle$AccessMode;
            // static
            readonly GET_AND_BITWISE_XOR_ACQUIRE: Java.invoke.VarHandle$AccessMode;
            
        
            // static
            values(): Java.invoke.VarHandle$AccessMode[];
            // static
            valueOf(arg0: string): Java.invoke.VarHandle$AccessMode;
            methodName(): string;
            // static
            valueFromMethodName(arg0: string): Java.invoke.VarHandle$AccessMode;
            
        }
    }

    export namespace module {
    
        export interface ModuleDescriptor extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor> {
            
        
            name(): string;
            modifiers(): Java.java.util.Set<Java.module.ModuleDescriptor$Modifier>;
            isOpen(): boolean;
            isAutomatic(): boolean;
            requires(): Java.java.util.Set<Java.module.ModuleDescriptor$Requires>;
            exports(): Java.java.util.Set<Java.module.ModuleDescriptor$Exports>;
            opens(): Java.java.util.Set<Java.module.ModuleDescriptor$Opens>;
            uses(): Java.java.util.Set<string>;
            provides(): Java.java.util.Set<Java.module.ModuleDescriptor$Provides>;
            version(): Java.java.util.Optional<Java.module.ModuleDescriptor$Version>;
            rawVersion(): Java.java.util.Optional<string>;
            toNameAndVersion(): string;
            mainClass(): Java.java.util.Optional<string>;
            packages(): Java.java.util.Set<string>;
            compareTo(arg0: Java.module.ModuleDescriptor): number;
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            // static
            newModule(arg0: string, arg1: Java.java.util.Set<Java.module.ModuleDescriptor$Modifier>): Java.module.ModuleDescriptor$Builder;
            // static
            newModule(arg0: string): Java.module.ModuleDescriptor$Builder;
            // static
            newOpenModule(arg0: string): Java.module.ModuleDescriptor$Builder;
            // static
            newAutomaticModule(arg0: string): Java.module.ModuleDescriptor$Builder;
            // static
            read(arg0: Java.java.io.InputStream, arg1: Java.java.util._function.Supplier<Java.java.util.Set<string>>): Java.module.ModuleDescriptor;
            // static
            read(arg0: Java.java.io.InputStream): Java.module.ModuleDescriptor;
            // static
            read(arg0: Java.java.nio.ByteBuffer, arg1: Java.java.util._function.Supplier<Java.java.util.Set<string>>): Java.module.ModuleDescriptor;
            // static
            read(arg0: Java.java.nio.ByteBuffer): Java.module.ModuleDescriptor;
            
        }
        export interface ModuleDescriptor$Requires extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor$Requires> {
            
        
            modifiers(): Java.java.util.Set<Java.module.ModuleDescriptor$Requires$Modifier>;
            name(): string;
            compiledVersion(): Java.java.util.Optional<Java.module.ModuleDescriptor$Version>;
            rawCompiledVersion(): Java.java.util.Optional<string>;
            compareTo(arg0: Java.module.ModuleDescriptor$Requires): number;
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            
        }
        export interface ModuleDescriptor$Opens extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor$Opens> {
            
        
            modifiers(): Java.java.util.Set<Java.module.ModuleDescriptor$Opens$Modifier>;
            isQualified(): boolean;
            source(): string;
            targets(): Java.java.util.Set<string>;
            compareTo(arg0: Java.module.ModuleDescriptor$Opens): number;
            hashCode(): number;
            equals(arg0: Java.Object): boolean;
            toString(): string;
            
        }
        export interface ModuleDescriptor$Exports extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor$Exports> {
            
        
            modifiers(): Java.java.util.Set<Java.module.ModuleDescriptor$Exports$Modifier>;
            isQualified(): boolean;
            source(): string;
            targets(): Java.java.util.Set<string>;
            compareTo(arg0: Java.module.ModuleDescriptor$Exports): number;
            hashCode(): number;
            equals(arg0: Java.Object): boolean;
            toString(): string;
            
        }
        export interface ModuleDescriptor$Provides extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor$Provides> {
            
        
            service(): string;
            providers(): Java.java.util.List<string>;
            compareTo(arg0: Java.module.ModuleDescriptor$Provides): number;
            hashCode(): number;
            equals(arg0: Java.Object): boolean;
            toString(): string;
            
        }
        export interface ModuleDescriptor$Builder extends Java.Object {
            
        
            requires(arg0: Java.module.ModuleDescriptor$Requires): Java.module.ModuleDescriptor$Builder;
            requires(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Requires$Modifier>, arg1: string, arg2: Java.module.ModuleDescriptor$Version): Java.module.ModuleDescriptor$Builder;
            requires(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Requires$Modifier>, arg1: string): Java.module.ModuleDescriptor$Builder;
            requires(arg0: string): Java.module.ModuleDescriptor$Builder;
            exports(arg0: Java.module.ModuleDescriptor$Exports): Java.module.ModuleDescriptor$Builder;
            exports(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Exports$Modifier>, arg1: string, arg2: Java.java.util.Set<string>): Java.module.ModuleDescriptor$Builder;
            exports(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Exports$Modifier>, arg1: string): Java.module.ModuleDescriptor$Builder;
            exports(arg0: string, arg1: Java.java.util.Set<string>): Java.module.ModuleDescriptor$Builder;
            exports(arg0: string): Java.module.ModuleDescriptor$Builder;
            opens(arg0: Java.module.ModuleDescriptor$Opens): Java.module.ModuleDescriptor$Builder;
            opens(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Opens$Modifier>, arg1: string, arg2: Java.java.util.Set<string>): Java.module.ModuleDescriptor$Builder;
            opens(arg0: Java.java.util.Set<Java.module.ModuleDescriptor$Opens$Modifier>, arg1: string): Java.module.ModuleDescriptor$Builder;
            opens(arg0: string, arg1: Java.java.util.Set<string>): Java.module.ModuleDescriptor$Builder;
            opens(arg0: string): Java.module.ModuleDescriptor$Builder;
            uses(arg0: string): Java.module.ModuleDescriptor$Builder;
            provides(arg0: Java.module.ModuleDescriptor$Provides): Java.module.ModuleDescriptor$Builder;
            provides(arg0: string, arg1: Java.java.util.List<string>): Java.module.ModuleDescriptor$Builder;
            packages(arg0: Java.java.util.Set<string>): Java.module.ModuleDescriptor$Builder;
            version(arg0: Java.module.ModuleDescriptor$Version): Java.module.ModuleDescriptor$Builder;
            version(arg0: string): Java.module.ModuleDescriptor$Builder;
            mainClass(arg0: string): Java.module.ModuleDescriptor$Builder;
            build(): Java.module.ModuleDescriptor;
            
        }
        export interface ModuleDescriptor$Version extends Java.Object, Java.Comparable<Java.module.ModuleDescriptor$Version> {
            
        
            // static
            parse(arg0: string): Java.module.ModuleDescriptor$Version;
            compareTo(arg0: Java.module.ModuleDescriptor$Version): number;
            equals(arg0: Java.Object): boolean;
            hashCode(): number;
            toString(): string;
            
        }
        export interface ModuleDescriptor$Modifier extends Java.Enum<Java.module.ModuleDescriptor$Modifier> {
            // static
            readonly OPEN: Java.module.ModuleDescriptor$Modifier;
            // static
            readonly AUTOMATIC: Java.module.ModuleDescriptor$Modifier;
            // static
            readonly SYNTHETIC: Java.module.ModuleDescriptor$Modifier;
            // static
            readonly MANDATED: Java.module.ModuleDescriptor$Modifier;
            
        
            // static
            values(): Java.module.ModuleDescriptor$Modifier[];
            // static
            valueOf(arg0: string): Java.module.ModuleDescriptor$Modifier;
            
        }
        export interface ModuleDescriptor$Exports$Modifier extends Java.Enum<Java.module.ModuleDescriptor$Exports$Modifier> {
            // static
            readonly SYNTHETIC: Java.module.ModuleDescriptor$Exports$Modifier;
            // static
            readonly MANDATED: Java.module.ModuleDescriptor$Exports$Modifier;
            
        
            // static
            values(): Java.module.ModuleDescriptor$Exports$Modifier[];
            // static
            valueOf(arg0: string): Java.module.ModuleDescriptor$Exports$Modifier;
            
        }
        export interface ModuleDescriptor$Requires$Modifier extends Java.Enum<Java.module.ModuleDescriptor$Requires$Modifier> {
            // static
            readonly TRANSITIVE: Java.module.ModuleDescriptor$Requires$Modifier;
            // static
            readonly STATIC: Java.module.ModuleDescriptor$Requires$Modifier;
            // static
            readonly SYNTHETIC: Java.module.ModuleDescriptor$Requires$Modifier;
            // static
            readonly MANDATED: Java.module.ModuleDescriptor$Requires$Modifier;
            
        
            // static
            values(): Java.module.ModuleDescriptor$Requires$Modifier[];
            // static
            valueOf(arg0: string): Java.module.ModuleDescriptor$Requires$Modifier;
            
        }
        export interface ModuleDescriptor$Opens$Modifier extends Java.Enum<Java.module.ModuleDescriptor$Opens$Modifier> {
            // static
            readonly SYNTHETIC: Java.module.ModuleDescriptor$Opens$Modifier;
            // static
            readonly MANDATED: Java.module.ModuleDescriptor$Opens$Modifier;
            
        
            // static
            values(): Java.module.ModuleDescriptor$Opens$Modifier[];
            // static
            valueOf(arg0: string): Java.module.ModuleDescriptor$Opens$Modifier;
            
        }
        export interface Configuration extends Java.Object {
            
        
            resolve(arg0: Java.module.ModuleFinder, arg1: Java.module.ModuleFinder, arg2: Java.java.util.Collection<string>): Java.module.Configuration;
            resolveAndBind(arg0: Java.module.ModuleFinder, arg1: Java.module.ModuleFinder, arg2: Java.java.util.Collection<string>): Java.module.Configuration;
            // static
            resolve(arg0: Java.module.ModuleFinder, arg1: Java.java.util.List<Java.module.Configuration>, arg2: Java.module.ModuleFinder, arg3: Java.java.util.Collection<string>): Java.module.Configuration;
            // static
            resolveAndBind(arg0: Java.module.ModuleFinder, arg1: Java.java.util.List<Java.module.Configuration>, arg2: Java.module.ModuleFinder, arg3: Java.java.util.Collection<string>): Java.module.Configuration;
            // static
            empty(): Java.module.Configuration;
            parents(): Java.java.util.List<Java.module.Configuration>;
            modules(): Java.java.util.Set<Java.module.ResolvedModule>;
            findModule(arg0: string): Java.java.util.Optional<Java.module.ResolvedModule>;
            toString(): string;
            
        }
        export interface ModuleFinder extends Java.Interface {
            
        
            find(arg0: string): Java.java.util.Optional<Java.module.ModuleReference>;
            findAll(): Java.java.util.Set<Java.module.ModuleReference>;
            // static
            ofSystem(): Java.module.ModuleFinder;
            // static
            of(arg0: Java.java.nio.file.Path[]): Java.module.ModuleFinder;
            // static
            compose(arg0: Java.module.ModuleFinder[]): Java.module.ModuleFinder;
            
        }
        export interface ResolvedModule extends Java.Object {
            
        
            configuration(): Java.module.Configuration;
            reference(): Java.module.ModuleReference;
            name(): string;
            reads(): Java.java.util.Set<Java.module.ResolvedModule>;
            hashCode(): number;
            equals(arg0: Java.Object): boolean;
            toString(): string;
            
        }
        export interface ModuleReference extends Java.Object {
            
        
            descriptor(): Java.module.ModuleDescriptor;
            location(): Java.java.util.Optional<Java.java.net.URI>;
            open(): Java.module.ModuleReader;
            
        }
        export interface ModuleReader extends Java.Interface, Java.java.io.Closeable {
            
        
            find(arg0: string): Java.java.util.Optional<Java.java.net.URI>;
            open(arg0: string): Java.java.util.Optional<Java.java.io.InputStream>;
            read(arg0: string): Java.java.util.Optional<Java.java.nio.ByteBuffer>;
            release(arg0: Java.java.nio.ByteBuffer): void;
            list(): Java.java.util.stream.Stream<string>;
            close(): void;
            
        }
    }
}