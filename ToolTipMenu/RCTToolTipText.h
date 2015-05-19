#import <UIKit/UIKit.h>
#import "RCTText.h"

@class RCTEventDispatcher;

@interface RCTToolTipText : RCTText

@property(nonatomic, strong) RCTEventDispatcher *_eventDispatcher;

- (void)tappedMenuItem:(NSString *)text;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
