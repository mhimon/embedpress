/**
 * BLOCK: embedpress-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import edit from './edit';
import { googleSlidesIcon } from '../common/icons';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'embedpress/document', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Document' ), // Block title.
	icon: googleSlidesIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embedpress', // Block category — Group blocks together based on common traits E.g. common, formatting, layout Widgets, embed.
	keywords: [
		__( 'embedpress' ),
		__( 'pdf' ),
		__( 'doc' ),
		__( 'ppt' ),
	],
	supports: {
		align: true,
		lightBlockWrapper: true,
	},
	attributes: {
		id: {
			type: "number"
		},
		href: {
			type: "string"
		},
		fileName: {
			type: "string",
		},
		textLinkHref: {
			type: "string",
		},
		textLinkTarget: {
			type: "string",
		},
		mime:{
			type: "string",
		}
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		//console.log(props)
		const { href }  = props.attributes
		const iframeSrc = 'https://docs.google.com/viewer?url='+href+'&embedded=true';
		const defaultClass = "ose-document-embed-presentation"
		return (
			<figure className={defaultClass}>
				<iframe src={iframeSrc} frameborder="0" allowfullscreen="true" style={{height:'600px',width:'600px'}}  mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
			</figure>
		);
	},

} );