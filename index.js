import grapesjs from 'grapesjs';
import pluginBlocks from 'grapesjs-blocks-basic';
import pluginNavbar from 'grapesjs-navbar';
import pluginCountdown from 'grapesjs-component-countdown';
import pluginForms from 'grapesjs-plugin-forms';
import pluginExport from 'grapesjs-plugin-export';
import pluginAviary from 'gjs-aviary';
import pluginFilestack from 'gjs-plugin-filestack';
import pluginLorySlider from 'grapesjs-lory-slider';
import pluginFlexbox from 'grapesjs-blocks-flexbox';
import pluginFirestore from 'grapesjs-firestore';
import pluginIndexeddb from 'grapesjs-indexeddb';
import pluginTabs from 'grapesjs-tabs';


import commands from './commands';
import blocks from './blocks';
import components from './components';
import panels from './panels';
import styles from './styles';

const attrTab = 'data-tab';
const attrTabs = 'data-tabs';
const attrTabContent = 'data-tab-content';
const attrTabContainer = 'data-tab-container';

export default grapesjs.plugins.add('gjs-preset-webpage', (editor, opts = {}) => {
  let config = opts;

  let defaults = {
    // Which blocks to add
    blocks: ['link-block', 'quote', 'text-basic', 'flexbox'],

    // Modal import title
    modalImportTitle: 'Import',

    // Modal import button text
    modalImportButton: 'Import',

    // Import description inside import modal
    modalImportLabel: '',

    // Default content to setup on import model open.
    // Could also be a function with a dynamic content return (must be a string)
    // eg. modalImportContent: editor => editor.getHtml(),
    modalImportContent: '',

    // Code viewer (eg. CodeMirror) options
    importViewerOptions: {},

    // Confirm text before cleaning the canvas
    textCleanCanvas: 'Are you sure to clean the canvas?',

    // Show the Style Manager on component change
    showStylesOnChange: 1,

    // Text for General sector in Style Manager
    textGeneral: 'General',

    // Text for Layout sector in Style Manager
    textLayout: 'Layout',

    // Text for Typography sector in Style Manager
    textTypography: 'Typography',

    // Text for Decorations sector in Style Manager
    textDecorations: 'Decorations',

    // Text for Extra sector in Style Manager
    textExtra: 'Extra',

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // `grapesjs-blocks-basic` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: {},

    // `grapesjs-navbar` plugin options
    // By setting this option to `false` will avoid loading the plugin
    navbarOpts: {},

    // `grapesjs-component-countdown` plugin options
    // By setting this option to `false` will avoid loading the plugin
    countdownOpts: {},

    // `grapesjs-plugin-forms` plugin options
    // By setting this option to `false` will avoid loading the plugin
    formsOpts: {},

    // `grapesjs-plugin-export` plugin options
    // By setting this option to `false` will avoid loading the plugin
    exportOpts: {},

    // `grapesjs-aviary` plugin options, disabled by default
    // Aviary library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    //aviaryOpts: 1,
    aviaryOpts: {
        key: '1',

        // By default, GrapesJS takes the modified image (hosted on AWS) and
        // adds it to the Asset Manager. If you need some custom logic (eg. add
        // watermark, upload the image on your servers) you can use custom
        // 'onApply' function
        // eg.
        // onApply: function(url, filename, imageModel) {
        //   var newUrl = ...;
        //   editor.AssetManager.add({ src: newUrl, name: filename });
        //   imageModel.set('src', newURL); // Update the image component
        // }
        onApply: null,

        // Customize the naming strategy
        // eg.
        // getFilename: function(model) {
        //   var name = model.get('src').split('/').pop();
        //   return Date.now() + '_' + name.slice(-15);
        // }
        getFilename: null,

        // Close the image editor on apply
        closeOnApply: true,

        // Aviary's configurations
        // https://creativesdk.adobe.com/docs/web/#/articles/imageeditorui/index.html
        config: {}
    },

    // `grapesjs-plugin-filestack` plugin options, disabled by default
    // Filestack library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    //filestackOpts: 1,
    filestackOpts: {
        // Filestack's API key
        key: '',

        // Custom button element which triggers Filestack modal
        btnEl: '',

        // Text for the button in case the custom one is not provided
        btnText: 'Add images',

        // Filestack's options
        filestackOpts: {
          accept: 'image/*',
          maxFiles: 10
        },

        // On complete upload callback
        // blobs - Array of Objects, eg. [{url:'...', filename: 'name.jpeg', ...}]
        // assets - Array of inserted assets
        // for debug: console.log(JSON.stringify(blobs));
        onComplete: (blobs, assets) => {},
    },
    
    lorysliderOpts: {
    // Object to extend the default slider block, eg. `{ label: 'Slider', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    sliderBlock: {},

    // Object to extend the default slider properties, eg. `{ name: 'My Slider', draggable: false, ... }`
    sliderProps: {},

    // Object to extend the default slider frame properties
    frameProps: {},

    // Object to extend the default slides properties
    slidesProps: {},

    // Object to extend the default slide properties
    slideProps: {},

    // Object to extend the default previous nav properties
    prevProps: {},

    // Object to extend the default next nav properties
    nextProps: {},

    // Default slides
    slideEls: `
      <div class="gjs-lory-slide"></div>
      <div class="gjs-lory-slide"></div>
      <div class="gjs-lory-slide"></div>
    `,

    // Previous nav element string, as for example, an HTML string
    prevEl: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
        <g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g>
      </svg>`,

    // Next nav element string, as for example, an HTML string
    nextEl: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
        <g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g>
      </svg>`,

    // Class name for the slider frame
    classFrame: 'gjs-lory-frame',

    // Class name for slides container
    classSlides: 'gjs-lory-slides',

    // Class name for slides container
    classSlide: 'gjs-lory-slide',

    // Class name for slider previous control
    classPrev: 'gjs-lory-prev',

    // Class name for slider next control
    classNext: 'gjs-lory-next',
    },
    
    flexboxOpts: {
    // Use this to extend the default flexbox block
    flexboxBlock: {},

    // Classes prefix
    stylePrefix: '',

    // Row label
    labelRow: 'Row',

    // Column label
    labelColumn: 'Column',
    },
    
    firestoreOpts: {
      // Firebase API key
      apiKey: '',

      // Firebase Auth domain
      authDomain: '',

      // Cloud Firestore project ID
      projectId: '',

      // Document id
      docId: 'gjs',

      // Collection name
      collectionName: 'templates',

      // Enable support for offline data persistence
      enableOffline: true,

      // Database settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
      settings: { timestampsInSnapshots: true },
    },
    
    indexeddbOpts: {
      // Database name
      dbName: 'gjs',

      // Collection name
      objectStoreName: 'templates',
    },
    
    tabsOpts: {
        // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
        // Pass a falsy value to avoid adding the block
        tabsBlock: {},

        // Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }`
        tabsProps: {},

        // Object to extend the default tab properties
        tabProps: {},

        // Object to extend the default tab content properties
        tabContentProps: {},

        // Object to extend the default tab container properties
        tabContainerProps: {},

        // Tabs attribute identifier (main component)
        attrTabs,

        // Tab attribute identifier
        attrTab,

        // Tab content attribute identifier
        attrTabContent,

        // Tab container attribute identifier
        attrTabContainer,

        // Default class to use on tab
        classTab: 'tab',

        // Class used on tabs when active
        classTabActive: 'tab-active',

        // Default class to use on tab content
        classTabContent: 'tab-content',

        // Default class to use on tab container
        classTabContainer: 'tab-container',

        // The attribute used inside tabs as a selector for tab contents
        selectorTab: 'href',

        // Default tabs template
        template: `
          <nav ${attrTabContainer}>
            <a href="#tab1" ${attrTab}>Tab 1</a>
            <a href="#tab2" ${attrTab}>Tab 2</a>
            <a href="#tab3" ${attrTab}>Tab 3</a>
          </nav>
          <div id="tab1" ${attrTabContent}>
            <div>Tab 1 Content</div>
          </div>
          <div id="tab2" ${attrTabContent}>
            <div>Tab 2 Content</div>
          </div>
          <div id="tab3" ${attrTabContent}>
            <div>Tab 3 Content</div>
          </div>
        `,

        // Default template for new added tab contents
        templateTabContent: `<div>New Tab Content</div>`,

        style: `
          .tab {
            text-decoration: none;
            color: inherit;
            padding: 7px 14px;
            transition: opacity 0.3s;
            display: inline-block;
            border-radius: 3px;
            margin-right: 10px;
          }
          .tab.tab-active {
            background-color: #0d94e6;
            color: white;
          }
          .tab-content {
            padding: 6px 12px;
            min-height: 100px;
            animation: fadeEffect 1s;
          }
          @keyframes fadeEffect {
            from {opacity: 0;}
            to {opacity: 1;}
          }
        `
}
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config))
      config[name] = defaults[name];
  }

  const {
    blocksBasicOpts,
    navbarOpts,
    countdownOpts,
    formsOpts,
    exportOpts,
    aviaryOpts,
    filestackOpts,
    lorysliderOpts,
    flexboxOpts,
    firestoreOpts,
    indexeddbOpts,
    tabsOpts,
  } = config;

  // Load plugins
  blocksBasicOpts && pluginBlocks(editor, blocksBasicOpts);
  navbarOpts && pluginNavbar(editor, navbarOpts);
  countdownOpts && pluginCountdown(editor, countdownOpts);
  formsOpts && pluginForms(editor, formsOpts);
  exportOpts && pluginExport(editor, exportOpts);
  aviaryOpts && pluginAviary(editor, aviaryOpts);
  filestackOpts && pluginFilestack(editor, filestackOpts);
  lorysliderOpts && pluginLorySlider(editor, lorysliderOpts);
  flexboxOpts && pluginFlexbox(editor, flexboxOpts);
  firestoreOpts && pluginFirestore(editor, firestoreOpts);
  indexeddbOpts && pluginindexeddb(editor, indexeddbOpts);
  tabsOpts && pluginTabs(editor, tabsOpts);
  

  // Load components
  components(editor, config);

  // Load blocks
  blocks(editor, config);

  // Load commands
  commands(editor, config);

  // Load panels
  panels(editor, config);

  // Load styles
  styles(editor, config);

});
